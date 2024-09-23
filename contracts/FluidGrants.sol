// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

import {ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {ISuperfluidPool} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/gdav1/ISuperfluidPool.sol";
import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";
import "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

contract FluidGrants {
    using SuperTokenV1Library for ISuperToken;

    uint256 public grantCount;
    uint256 public projectCount;

    struct Grant {
        uint256 id;
        string name;
        string description;
        string externalUrl;
        uint256 amount;
        uint256 submissionStartsAt;
        uint256 submissionEndsAt;
        uint256 judgingStartsAt;
        uint256 judgingEndsAt;
        ISuperToken distributionToken;
        ISuperfluidPool pool;
        bool isActive;
    }

    struct Project {
        uint256 id;
        string name;
        string description;
        string repositoryUrl;
        string demoUrl;
        address walletAddress;
        uint256 votes;
    }

    event GrantCreated(
        uint256 id,
        string name,
        string description,
        string externalUrl,
        uint256 amount,
        uint256 submissionStartsAt,
        uint256 submissionEndsAt,
        uint256 judgingStartsAt,
        uint256 judgingEndsAt,
        address distributionToken,
        address pool
    );

    event ProjectSubmitted(
        uint256 id,
        uint256 grantId,
        string name,
        string description,
        string repositoryUrl,
        string demoUrl,
        address walletAddress
    );

    event ProjectVoted(
        uint256 projectId,
        uint256 grantId,
        uint256 votes,
        address voter
    );

    event GrantDistributed(uint256 grantId, uint256 amount);

    mapping(uint256 grantId => Grant) public grants;
    mapping(uint256 projectId => Project) public projects;
    mapping(uint256 grantId => uint256 count) public grantProjectCount;
    mapping(uint256 grantId => mapping(address user => bool hasSubmitted))
        public hasSubmittedToGrant;
    mapping(uint256 grantId => mapping(uint256 projectId => bool))
        public isProjectInGrant;

    function createGrant(
        string memory _name,
        string memory _description,
        string memory _externalUrl,
        uint256 _amount,
        uint256 _submissionStartsAt,
        uint256 _submissionEndsAt,
        uint256 _judgingStartsAt,
        uint256 _judgingEndsAt,
        ISuperToken _distributionToken
    ) external {
        PoolConfig memory config = PoolConfig({
            transferabilityForUnitsOwner: false,
            distributionFromAnyAddress: true
        });

        ISuperfluidPool pool = _distributionToken.createPool(
            address(this),
            config
        );

        uint256 grantId = grantCount++;

        grants[grantId] = Grant({
            id: grantId,
            name: _name,
            description: _description,
            amount: _amount,
            submissionStartsAt: _submissionStartsAt,
            submissionEndsAt: _submissionEndsAt,
            judgingStartsAt: _judgingStartsAt,
            judgingEndsAt: _judgingEndsAt,
            externalUrl: _externalUrl,
            distributionToken: _distributionToken,
            pool: pool,
            isActive: true
        });
        emit GrantCreated(
            grantId,
            _name,
            _description,
            _externalUrl,
            _amount,
            _submissionStartsAt,
            _submissionEndsAt,
            _judgingStartsAt,
            _judgingEndsAt,
            address(_distributionToken),
            address(pool)
        );
    }

    function distributeGrant(uint256 _grantId) external {
        Grant storage grant = grants[_grantId];
        require(grant.isActive, "Grant is not active");
        ISuperToken token = grant.distributionToken;
        uint256 amount = grant.amount;
        token.distributeToPool(address(this), grant.pool, amount);
        grant.isActive = false;
        emit GrantDistributed(_grantId, amount);
    }

    function submitProject(
        uint256 _grantId,
        string memory _name,
        string memory _description,
        string memory repositoryUrl,
        string memory _demoUrl,
        address _walletAddress
    ) external {
        Grant memory grant = grants[_grantId];
        require(grant.isActive, "Grant is not active");
        require(
            block.timestamp >= grant.submissionStartsAt ||
                block.timestamp <= grant.submissionEndsAt,
            "Grant is not in submission period"
        );
        require(
            !hasSubmittedToGrant[_grantId][msg.sender],
            "You have already submitted a project to this grant"
        );
        ISuperToken token = grant.distributionToken;
        ISuperfluidPool pool = grant.pool;
        uint256 projectId = grantProjectCount[_grantId]++;
        projects[projectId] = Project({
            id: projectId,
            name: _name,
            description: _description,
            repositoryUrl: repositoryUrl,
            demoUrl: _demoUrl,
            walletAddress: _walletAddress,
            votes: 0
        });
        hasSubmittedToGrant[_grantId][msg.sender] = true;
        isProjectInGrant[_grantId][projectId] = true;
        token.connectPool(pool);
        emit ProjectSubmitted(
            projectId,
            _grantId,
            _name,
            _description,
            repositoryUrl,
            _demoUrl,
            _walletAddress
        );
    }

    function voteOnProject(
        uint256 _grantId,
        uint256 _projectId,
        uint128 _votes
    ) external {
        Grant memory grant = grants[_grantId];
        Project storage project = projects[_projectId];
        require(project.walletAddress != address(0), "Project does not exist");
        require(grant.isActive, "Grant is not active");
        require(
            block.timestamp >= grant.judgingStartsAt ||
                block.timestamp <= grant.judgingEndsAt,
            "Grant is not in judging period"
        );
        require(
            isProjectInGrant[_grantId][_projectId],
            "Project is not in grant"
        );
        project.votes = _votes;
        ISuperToken token = grant.distributionToken;
        ISuperfluidPool pool = grant.pool;
        token.updateMemberUnits(pool, project.walletAddress, _votes);
        emit ProjectVoted(_projectId, _grantId, _votes, msg.sender);
    }
}

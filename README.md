# FluidGrants

FluidGrants is a decentralized grant management platform designed to revolutionize the way hackathon-style grants are distributed and managed. It leverages Superfluid’s real-time finance protocols to ensure seamless and fair distribution of funds based on community votes.

Participants can create grants, submit projects, and allow a panel of judges to vote on the best submissions. Once the judging period is complete, FluidGrants automatically distributes the total grant pool to the top projects, weighted by the number of votes received.

The platform ensures transparency, accountability, and fairness by utilizing Superfluid's distribution pools, where grant amounts flow dynamically to project creators in real-time based on votes. This model encourages participation and rewards innovation by streamlining the process from submission to funding.

### Features

Grant Creation: Organizers can set up new grants, specifying the total grant amount, submission deadlines, and judging periods.

Project Submission: Users can submit their projects, along with relevant details such as repository links and demo URLs, during the submission window.

Voting Mechanism: Judges vote on the submitted projects during the judging period, with votes tied directly to the distribution of the grant pool.

Real-Time Distribution: After voting, the total grant amount is distributed to projects in real-time using Superfluid's distribution pools, ensuring instant and fair payouts based on votes.

Transparency and Accountability: All transactions, votes, and fund distributions are on-chain, promoting transparency and reducing the risk of centralized control or manipulation.

FluidGrants provides a decentralized solution for hackathons, innovation challenges, and community grants, enabling efficient fund distribution while promoting innovation in the blockchain ecosystem.

**Note: This project is still under active development.**

### Getting Started

1. Compile and deploy the contracts

> Copy `.env.example` to `.env` and update the values

```
npm install

npx hardhat compile

npx hardhat deploy
```

2. Deploy Subgraph

```
cd subgraph

npm install

npm run codegen

npm run deploy
```

### Safety

This is experimental software and subject to change over time.

This is a proof of concept and is not ready for production use. It is not audited and has not been tested for security. Use at your own risk. I do not give any warranties and will not be liable for any loss incurred through any use of this codebase.

### License

This project is licensed under the MIT License.

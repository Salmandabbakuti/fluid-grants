import { BigInt } from "@graphprotocol/graph-ts";
import {
  GrantCreated as GrantCreatedEvent,
  GrantDistributed as GrantDistributedEvent,
  ProjectSubmitted as ProjectSubmittedEvent,
  ProjectVoted as ProjectVotedEvent
} from "../generated/FluidGrants/FluidGrants";
import { Grant, Project } from "../generated/schema";

export function handleGrantCreated(event: GrantCreatedEvent): void {
  const grant = new Grant(event.params.id.toString());
  grant.name = event.params.name;
  grant.description = event.params.description;
  grant.externalUrl = event.params.externalUrl;
  grant.amount = event.params.amount;
  grant.submissionStartsAt = event.params.submissionStartsAt;
  grant.submissionEndsAt = event.params.submissionEndsAt;
  grant.judgingStartsAt = event.params.judgingStartsAt;
  grant.judgingEndsAt = event.params.judgingEndsAt;
  grant.distributionToken = event.params.distributionToken;
  grant.distributionPool = event.params.pool;
  grant.status = "ACTIVE";
  grant.createdAt = event.block.timestamp;
  grant.updatedAt = event.block.timestamp;
  grant.save();
}

export function handleGrantDistributed(event: GrantDistributedEvent): void {
  const grant = Grant.load(event.params.grantId.toString());
  if (grant) {
    grant.status = "COMPLETED";
    grant.updatedAt = event.block.timestamp;
    grant.save();
  }
}

export function handleProjectSubmitted(event: ProjectSubmittedEvent): void {
  const project = new Project(
    event.params.grantId.toString() + "-" + event.params.id.toString()
  );
  project.name = event.params.name;
  project.description = event.params.description;
  project.repositoryUrl = event.params.repositoryUrl;
  project.demoUrl = event.params.demoUrl;
  project.walletAddress = event.params.walletAddress;
  project.votes = BigInt.fromI32(0);
  project.grant = event.params.grantId.toString();
  project.createdAt = event.block.timestamp;
  project.updatedAt = event.block.timestamp;
  project.save();
}

export function handleProjectVoted(event: ProjectVotedEvent): void {
  const project = Project.load(
    event.params.grantId.toString() + "-" + event.params.projectId.toString()
  );
  if (project) {
    project.votes = event.params.votes;
    project.updatedAt = event.block.timestamp;
    project.save();
  }
}

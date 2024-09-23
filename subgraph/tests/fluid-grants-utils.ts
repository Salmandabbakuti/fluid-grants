import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  GrantCreated,
  GrantDistributed,
  ProjectSubmitted,
  ProjectVoted
} from "../generated/FluidGrants/FluidGrants"

export function createGrantCreatedEvent(
  id: BigInt,
  name: string,
  description: string,
  externalUrl: string,
  amount: BigInt,
  submissionStartsAt: BigInt,
  submissionEndsAt: BigInt,
  judgingStartsAt: BigInt,
  judgingEndsAt: BigInt,
  distributionToken: Address,
  pool: Address
): GrantCreated {
  let grantCreatedEvent = changetype<GrantCreated>(newMockEvent())

  grantCreatedEvent.parameters = new Array()

  grantCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  grantCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  grantCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  grantCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "externalUrl",
      ethereum.Value.fromString(externalUrl)
    )
  )
  grantCreatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  grantCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "submissionStartsAt",
      ethereum.Value.fromUnsignedBigInt(submissionStartsAt)
    )
  )
  grantCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "submissionEndsAt",
      ethereum.Value.fromUnsignedBigInt(submissionEndsAt)
    )
  )
  grantCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "judgingStartsAt",
      ethereum.Value.fromUnsignedBigInt(judgingStartsAt)
    )
  )
  grantCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "judgingEndsAt",
      ethereum.Value.fromUnsignedBigInt(judgingEndsAt)
    )
  )
  grantCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "distributionToken",
      ethereum.Value.fromAddress(distributionToken)
    )
  )
  grantCreatedEvent.parameters.push(
    new ethereum.EventParam("pool", ethereum.Value.fromAddress(pool))
  )

  return grantCreatedEvent
}

export function createGrantDistributedEvent(
  grantId: BigInt,
  amount: BigInt
): GrantDistributed {
  let grantDistributedEvent = changetype<GrantDistributed>(newMockEvent())

  grantDistributedEvent.parameters = new Array()

  grantDistributedEvent.parameters.push(
    new ethereum.EventParam(
      "grantId",
      ethereum.Value.fromUnsignedBigInt(grantId)
    )
  )
  grantDistributedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return grantDistributedEvent
}

export function createProjectSubmittedEvent(
  id: BigInt,
  grantId: BigInt,
  name: string,
  description: string,
  repositoryUrl: string,
  demoUrl: string,
  walletAddress: Address
): ProjectSubmitted {
  let projectSubmittedEvent = changetype<ProjectSubmitted>(newMockEvent())

  projectSubmittedEvent.parameters = new Array()

  projectSubmittedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  projectSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "grantId",
      ethereum.Value.fromUnsignedBigInt(grantId)
    )
  )
  projectSubmittedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  projectSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  projectSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "repositoryUrl",
      ethereum.Value.fromString(repositoryUrl)
    )
  )
  projectSubmittedEvent.parameters.push(
    new ethereum.EventParam("demoUrl", ethereum.Value.fromString(demoUrl))
  )
  projectSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "walletAddress",
      ethereum.Value.fromAddress(walletAddress)
    )
  )

  return projectSubmittedEvent
}

export function createProjectVotedEvent(
  projectId: BigInt,
  grantId: BigInt,
  votes: BigInt,
  voter: Address
): ProjectVoted {
  let projectVotedEvent = changetype<ProjectVoted>(newMockEvent())

  projectVotedEvent.parameters = new Array()

  projectVotedEvent.parameters.push(
    new ethereum.EventParam(
      "projectId",
      ethereum.Value.fromUnsignedBigInt(projectId)
    )
  )
  projectVotedEvent.parameters.push(
    new ethereum.EventParam(
      "grantId",
      ethereum.Value.fromUnsignedBigInt(grantId)
    )
  )
  projectVotedEvent.parameters.push(
    new ethereum.EventParam("votes", ethereum.Value.fromUnsignedBigInt(votes))
  )
  projectVotedEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )

  return projectVotedEvent
}

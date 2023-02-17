import { fetcher } from "@/lens/graphql/auth-fetcher";
import {
  ChallengeQuery,
  ChallengeQueryVariables,
  ChallengeDocument,
} from "@/lens/graphql/generated";

export default async function generateChallenge(address: string) {
  return await fetcher<ChallengeQuery, ChallengeQueryVariables>(
    ChallengeDocument,
    {
      request: {
        address,
      },
    }
  )();
}

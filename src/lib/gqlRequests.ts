import { gql } from "utils";

export const USER_FRAGMENT = gql`
  fragment UserFields on User {
    username
    name
    provider
    upvotedIds
    downvotedIds
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFields on Comment {
    id
    text
    authorId
    author {
      name
      provider
    }
    votes
    createdAt
  }
`;

export const COMMENT = gql`
    ...CommentFields
    children {
        ...CommentFields
        children {
            ...CommentFields
            children {
                ...CommentFields
                children {
                  ...CommentFields
                  moreComments
                }
            }
        }
    }
`;

export const USER_QUERY = gql`
  query {
    me {
      ...UserFields
    }
  }

  ${USER_FRAGMENT}
`;

export const USER_COMMENT_QUERY = gql`
  query {
    me {
      comments {
        ...CommentFields
      }
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const DOWNVOTED_COMMENT_QUERY = gql`
  query {
    me {
      downvoted {
        ...CommentFields
      }
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const UPVOTED_COMMENT_QUERY = gql`
  query {
    me {
      upvoted {
        ...CommentFields
      }
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const PAGE_QUERY = gql`query Page($id: String) {
    page(where: { id: $id }) {
      name
      comments {
        ${COMMENT}
      }
      site {
        errorColor
        primaryColor
        authIcons
        timestamps
        ratings
        providers
        authorId
      }
    }
  }
  ${COMMENT_FRAGMENT}`;

export const VOTE_COMMENT_QUERY = gql`
  mutation CommentVote($type: VoteType!, $commentId: ID!) {
    vote(type: $type, commentId: $commentId) {
      votes
      author {
        ...UserFields
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const COMMENT_QUERY = gql`
    query PageWithComments($id: String) {
        page(where: { id: $id }) {
            comments {
                ${COMMENT}
            }
            site {
                errorColor
                primaryColor
                authIcons
                timestamps
                ratings
                providers
                authorId
            }
        }
    }
    ${COMMENT_FRAGMENT}
`;

export const CREATE_COMMENT_QUERY = gql`
  mutation CreateComment($text: String!, $pageId: ID, $parentCommentId: ID) {
    createOneComment(
      text: $text
      pageId: $pageId
      parentCommentId: $parentCommentId
    ) {
      ...CommentFields
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const SINGLE_COMMENT_QUERY = gql`
  query SingleComment($id: String!) {
    comment(where: { id: $id }) {
      ...CommentFields
      ${COMMENT}
    }
  }
  ${COMMENT_FRAGMENT}
`;

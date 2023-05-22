import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Person = {
  __typename?: 'Person';
  age: Scalars['Int'];
  alias: Scalars['String'];
  id: Scalars['String'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  occupation: Scalars['String'];
  species?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  people: Array<Person>;
  person: Person;
};


export type QueryPeopleArgs = {
  species?: InputMaybe<Scalars['String']>;
};


export type QueryPersonArgs = {
  id: Scalars['String'];
};

export type Relationship = {
  __typename?: 'Relationship';
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type _Service = {
  __typename?: '_Service';
  sdl: Scalars['String'];
};


export const GetPeopleDocument = gql`
    query GetPeople($species: String) {
  people(species: $species) {
    id
    name
    age
    species
    alias
    imageUrl
  }
}
    `;

export function useGetPeopleQuery(options?: Omit<Urql.UseQueryArgs<GetPeopleQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPeopleQuery, GetPeopleQueryVariables>({ query: GetPeopleDocument, ...options });
};
export const GetPersonDocument = gql`
    query GetPerson($id: String!) {
  person(id: $id) {
    id
    species
    name
    age
    alias
    imageUrl
    occupation
  }
}
    `;

export function useGetPersonQuery(options: Omit<Urql.UseQueryArgs<GetPersonQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPersonQuery, GetPersonQueryVariables>({ query: GetPersonDocument, ...options });
};
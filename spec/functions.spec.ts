import { buildQuery, getMultiMatchPrefixQuery } from '../src/functions';

describe('functions tests', () => {
  it('should build a term query for the given name and value', () => {
    const name = 'status';
    const value = 'active';
    const query = buildQuery(name, value);
    expect(query.toJSON()).toEqual({ term: { status: 'active' } });
  });

  it('should build a bool query with a phrase_prefix multi_match', () => {
    const queryString = 'foo';
    const fields = ['title', 'body'];
    const query = getMultiMatchPrefixQuery(queryString, fields);
    expect(query.toJSON()).toEqual({
      bool: {
        should: {
          multi_match: {
            query: 'foo',
            type: 'phrase_prefix',
            fields: ['title', 'body']
          }
        },
        minimum_should_match: 1
      }
    });
  });
});

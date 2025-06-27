import * as esb from 'elastic-builder';

/**
 * Builds a Query object for the given name and value using eliastic-builder.
 * @param name - The field name
 * @param value - The field value
 * @returns Query object representing `name:value`
 */
export function buildQuery(name: string, value: string): esb.TermQuery {
  // elastic-builder uses esb.termQuery(name, value) for term queries
  return esb.termQuery(name, value);
}

export function getMultiMatchPrefixQuery(queryString: string, fields: string[]): esb.BoolQuery {
  return esb.boolQuery().should([esb.multiMatchQuery(fields, queryString).type('phrase_prefix')]).minimumShouldMatch(1);
}

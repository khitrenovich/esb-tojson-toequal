# esb-tojson-toequal

This project demonstrates usage of `elastic-builder` with TypeScript and Jest, and reproduces a Jest 30 deep equality issue when using `.toEqual()` on certain query objects.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/khitrenovich/esb-tojson-toequal.git
   cd esb-tojson-toequal
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests

To run the test suite:

```bash
npm test
```

## Jest 30 Deep Equality Issue

When running the tests with Jest 30, you may encounter a failing test for the `getMultiMatchPrefixQuery` function due to a symbol property added by Jest to the result object. This causes `.toEqual()` to fail, even though the visible structure matches.

### Example Jest 30 Failure Log

```
> esb-tojson-toequal@1.0.0 test
> jest

 FAIL  spec/functions.spec.ts    
  functions tests            
    ✓ should build a term query for the given name and value (2 ms)
    ✕ should build a bool query with a phrase_prefix multi_match (5 ms)
                             
  ● functions tests › should build a bool query with a phrase_prefix multi_match
                             
    expect(received).toEqual(expected) // deep equality

    - Expected  - 0
    + Received  + 1

    @@ -9,7 +9,8 @@
              ],
              "query": "foo",
              "type": "phrase_prefix",
            },
          },
    +     Symbol($$jest-protect-from-deletion): Array [],
        },
      }

      13 |     const fields = ['title', 'body'];
      14 |     const query = getMultiMatchPrefixQuery(queryString, fields);
    > 15 |     expect(query.toJSON()).toEqual({
         |                            ^
      16 |       bool: {
      17 |         should: {
      18 |           multi_match: {

      at Object.<anonymous> (spec/functions.spec.ts:15:28)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
Snapshots:   0 total
Time:        2.078 s
Ran all test suites.
```


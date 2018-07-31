## Test data

These files are used as the reference data for the tests.

They are generated with the `generate_data.sh` script.

Note: The `generate_data.sh` script should NOT be invoked without first
verifying that the current functionality is flawless. Generating new test files
will essentially test the current implementation against itself.

These tests will detect whether there are changes in the bitstreams but they
will NOT detect whether the current functionality matches the OPUS spec.

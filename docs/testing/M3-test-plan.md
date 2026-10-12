# M3 Test Plan
Engineering basis: validate input partitions, boundary values, role/operation permission combinations and lifecycle state transitions. Run npm run check and npm test. Tests use Node's built-in test and HTTP modules.

Black-box techniques: equivalence partitioning (valid/invalid fields and roles), boundary value analysis (title 2/3/120/121; category 60/61), decision-table checks (role x operation), and state-transition testing (legal and illegal status changes).

Performance: run npm start then npm run load. Default 25 concurrent synthetic submissions. Repeat at least three times, record environment and compare p95 with the exact approved NFR threshold. This is a baseline exercise, not a capacity certification.

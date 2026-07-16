# Backend API Design Instructions

- Design endpoints around clear, stable resources and predictable verbs.
- Use consistent naming, versioning, and response shapes across the API.
- Validate inputs early and return actionable error responses.
- Prefer explicit status codes and avoid ambiguous success payloads.
- Keep handlers focused on orchestration and delegate domain logic to services.
- Document request and response expectations clearly in code and schemas.
- Handle authentication, authorization, and rate limiting consistently.
- Avoid breaking changes when possible and prefer additive evolution.
- Ensure APIs are observable with meaningful logs and error context.

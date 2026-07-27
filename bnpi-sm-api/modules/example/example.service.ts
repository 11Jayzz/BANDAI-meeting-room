import type {
  ExampleEchoRequest,
  ExampleItemParams,
  ExampleListQuery,
} from "../../schema/example";

export type ExampleEchoResult = {
  echo: string;
  receivedAt: string;
  meta: Record<string, unknown>;
};

/**
 * Reference domain logic for modules/example.
 * Controllers stay thin — put business rules here.
 */
export async function echoMessage(
  input: ExampleEchoRequest
): Promise<ExampleEchoResult> {
  return {
    echo: input.message,
    receivedAt: new Date().toISOString(),
    meta: input.meta ?? {},
  };
}

export function getExampleStatus() {
  return {
    module: "example",
    purpose:
      "Reference module demonstrating Zod body/query/params + service + envelope",
    ready: true as const,
    validation: {
      body: "POST /echo",
      query: "GET /items",
      params: "GET /items/:id",
    },
  };
}

/** Demo list — pagination comes from validated query. */
export function listExampleItems(query: ExampleListQuery) {
  const total = 42;
  const start = (query.page - 1) * query.limit;
  const items = Array.from({ length: Math.min(query.limit, 5) }, (_, i) => ({
    id: `item-${start + i + 1}`,
    label: `Example item ${start + i + 1}`,
  }));

  return {
    page: query.page,
    limit: query.limit,
    total,
    items,
  };
}

/** Demo item by path param. */
export function getExampleItem(params: ExampleItemParams) {
  return {
    id: params.id,
    label: `Example item ${params.id}`,
    found: true as const,
  };
}

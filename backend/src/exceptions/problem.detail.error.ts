export class ProblemDetail extends Error {
  constructor(
    public readonly type: string,
    public readonly title: string,
    public readonly status: number,
    public readonly detail: string,
    public readonly instance?: string,
    public readonly extra?: Record<string, any>
  ) {
    super(title);
    this.name = "ProblemDetail";
  }
}

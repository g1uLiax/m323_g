/**
 * A custom IO monad representing a lazy asynchronous computation.
 * This encapsulates side-effects (like HTTP requests, file I/O, console logging)
 * to keep functions pure until the final unsafe execution.
 */
export class IO<A> {
  private constructor(private readonly runIO: () => Promise<A>) {}

  /**
   * Lift a lazy value or computation into an IO context.
   */
  public static of<A>(thunk: () => Promise<A> | A): IO<A> {
    return new IO(async () => thunk());
  }

  /**
   * Lift a pure value into an IO context.
   */
  public static pure<A>(value: A): IO<A> {
    return new IO(async () => value);
  }

  /**
   * Map a function over the result of this IO.
   */
  public map<B>(f: (a: A) => B): IO<B> {
    return new IO(async () => {
      const a = await this.runIO();
      return f(a);
    });
  }

  /**
   * Chain another IO computation based on the result of this IO.
   */
  public flatMap<B>(f: (a: A) => IO<B>): IO<B> {
    return new IO(async () => {
      const a = await this.runIO();
      return f(a).unsafeRun();
    });
  }

  /**
   * Catch errors that occur in this IO computation and recover.
   */
  public catchError(f: (error: any) => IO<A>): IO<A> {
    return new IO(async () => {
      try {
        return await this.runIO();
      } catch (err) {
        return f(err).unsafeRun();
      }
    });
  }

  /**
   * Run the side-effects encapsulated inside the IO context.
   * This should only be called at the edge of the application (e.g., in main.ts).
   */
  public unsafeRun(): Promise<A> {
    return this.runIO();
  }
}

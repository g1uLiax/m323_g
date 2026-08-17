/**
 * A custom IO monad representing a lazy asynchronous computation.
 * This encapsulates side-effects (like HTTP requests, file I/O, console logging)
 * to keep functions pure until the final unsafe execution.
 */
export declare class IO<A> {
    private readonly runIO;
    private constructor();
    /**
     * Lift a lazy value or computation into an IO context.
     */
    static of<A>(thunk: () => Promise<A> | A): IO<A>;
    /**
     * Lift a pure value into an IO context.
     */
    static pure<A>(value: A): IO<A>;
    /**
     * Map a function over the result of this IO.
     */
    map<B>(f: (a: A) => B): IO<B>;
    /**
     * Chain another IO computation based on the result of this IO.
     */
    flatMap<B>(f: (a: A) => IO<B>): IO<B>;
    /**
     * Catch errors that occur in this IO computation and recover.
     */
    catchError(f: (error: any) => IO<A>): IO<A>;
    /**
     * Run the side-effects encapsulated inside the IO context.
     * This should only be called at the edge of the application (e.g., in main.ts).
     */
    unsafeRun(): Promise<A>;
}

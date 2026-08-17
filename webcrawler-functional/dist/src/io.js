/**
 * A custom IO monad representing a lazy asynchronous computation.
 * This encapsulates side-effects (like HTTP requests, file I/O, console logging)
 * to keep functions pure until the final unsafe execution.
 */
export class IO {
    runIO;
    constructor(runIO) {
        this.runIO = runIO;
    }
    /**
     * Lift a lazy value or computation into an IO context.
     */
    static of(thunk) {
        return new IO(async () => thunk());
    }
    /**
     * Lift a pure value into an IO context.
     */
    static pure(value) {
        return new IO(async () => value);
    }
    /**
     * Map a function over the result of this IO.
     */
    map(f) {
        return new IO(async () => {
            const a = await this.runIO();
            return f(a);
        });
    }
    /**
     * Chain another IO computation based on the result of this IO.
     */
    flatMap(f) {
        return new IO(async () => {
            const a = await this.runIO();
            return f(a).unsafeRun();
        });
    }
    /**
     * Catch errors that occur in this IO computation and recover.
     */
    catchError(f) {
        return new IO(async () => {
            try {
                return await this.runIO();
            }
            catch (err) {
                return f(err).unsafeRun();
            }
        });
    }
    /**
     * Run the side-effects encapsulated inside the IO context.
     * This should only be called at the edge of the application (e.g., in main.ts).
     */
    unsafeRun() {
        return this.runIO();
    }
}

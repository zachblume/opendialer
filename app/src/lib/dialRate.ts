type Percentage = number & { _typeGuard?: never };
type PositiveInteger = number & { _typeGuard?: never };

/**
 * Validates if the provided value is between 0 and 1 (inclusive).
 * @param value - The value to validate.
 * @returns True if the value is a valid percentage, false otherwise.
 */
const validatePercentage = (value: number): value is Percentage =>
    value >= 0 && value <= 1;

/**
 * Validates if the provided value is a positive integer
 * @param value - The value to validate.
 * @returns True if the value is a positive integer, false otherwise.
 */
const validatePositiveInteger = (value: number): value is PositiveInteger =>
    Number.isInteger(value) && value > 0;

// validateZeroOrPositiveInteger
/**
 * Validates if the provided value is a positive integer or zero
 * @param value - The value to validate.
 * @returns True if the value is a positive integer or zero, false otherwise.
 */
const validateZeroOrPositiveInteger = (
    value: number
): value is PositiveInteger | 0 => Number.isInteger(value) && value >= 0;

/**
 * Compute factorial of a number. Used for combination calculations.
 * @param n - Positive integer whose factorial is to be calculated.
 * @returns Factorial of n.
 */
const factorial = (n: PositiveInteger): number => {
    if (!validateZeroOrPositiveInteger(n)) {
        throw new Error("Input must be a positive integer.");
    }
    if (n <= 1) return 1;
    return n * factorial(n - 1);
};

/**
 * Compute combination (n choose k).
 * @param n - Total number of items.
 * @param k - Number of items to choose.
 * @returns Number of ways to choose k items from n.
 */
const combination = (n: PositiveInteger, k: PositiveInteger): number => {
    if (!validatePositiveInteger(n) || !validatePositiveInteger(k)) {
        throw new Error("Inputs must be positive integers.");
    }
    return factorial(n) / (factorial(k) * factorial(n - k));
};

/**
 * Computes the probability of a dropped call given calls, answer rate, and agents.
 * @param calls - Total number of calls made.
 * @param answerRate - Probability of any individual call being answered.
 * @param agents - Number of available agents.
 * @returns Probability of a call being dropped.
 */
const computeDroppedCallProbability = (
    calls: PositiveInteger,
    answerRate: Percentage,
    agents: PositiveInteger
): number => {
    if (
        !validatePercentage(answerRate) ||
        !validatePositiveInteger(calls) ||
        !validatePositiveInteger(agents)
    ) {
        throw new Error("Invalid input parameters.");
    }
    let probability = 0;
    for (let k = agents + 1; k <= calls; k++) {
        probability +=
            combination(calls, k) *
            Math.pow(answerRate, k) *
            Math.pow(1 - answerRate, calls - k);
    }
    return probability;
};

/**
 * Determines the number of calls to make in order to achieve a target drop rate.
 * @param answerRate - Probability of any individual call being answered.
 * @param numberOfAgents - Number of available agents.
 * @returns Number of calls to make to achieve the target drop rate.
 */
const findNumberOfCallsToMake = (
    answerRate: Percentage,
    numberOfAgents: PositiveInteger
): PositiveInteger => {
    if (
        !validatePercentage(answerRate) ||
        !validatePositiveInteger(numberOfAgents)
    ) {
        throw new Error("Invalid input parameters.");
    }
    const targetProbability = 0.03; // 3%
    let numberOfCallsToMake: PositiveInteger =
        numberOfAgents as PositiveInteger; // Start with the number of agents as a minimum
    let currentProbability = 0;

    while (currentProbability < targetProbability) {
        numberOfCallsToMake = (numberOfCallsToMake + 1) as PositiveInteger;
        currentProbability = computeDroppedCallProbability(
            numberOfCallsToMake,
            answerRate,
            numberOfAgents
        );
    }

    return numberOfCallsToMake;
};

/**
 * Computes the number of calls a predictive dialer should make per agent to achieve a 3% dropped call rate.
 * @param answerRate - Probability of any individual call being answered.
 * @returns Number of calls to make per agent.
 * Example usage
 * const answerRateExample = 0.25 as Percentage
 * console.log(overdialRate(answerRateExample))
 */
const calculateOverdialRate = (answerRate: Percentage): PositiveInteger => {
    if (!validatePercentage(answerRate)) {
        throw new Error(
            "Answer rate must be a valid percentage between 0 and 1."
        );
    }
    const numberOfAgents = 1 as PositiveInteger; // Since you want calls per agent, we'll consider one agent
    return findNumberOfCallsToMake(answerRate, numberOfAgents);
};

export default calculateOverdialRate;

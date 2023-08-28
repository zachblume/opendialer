type Percentage = number & { _typeGuard?: never }; // Number between 0 and 1 (inclusive)
type PositiveInteger = number & { _typeGuard?: never }; // Positive integer

/**
 * Validates if the provided value is between 0 and 1 (inclusive).
 * @param value The value to validate.
 * @returns The value if it's valid.
 */
function validatePercentage(value: number): value is Percentage {
    return value >= 0 && value <= 1;
}

/**
 * Validates if the provided value is a positive integer.
 * @param value The value to validate.
 * @returns The value if it's valid.
 */
function validatePositiveInteger(value: number): value is PositiveInteger {
    return Number.isInteger(value) && value > 0;
}

/**
 * Calculates the dial rate based on the binomial distribution approach.
 *
 * @param answerRate - The probability that a dialed number will be answered (between 0 and 1).
 * @param availableAgents - Number of available agents.
 * @param abandonRateTarget - The target abandon rate (between 0 and 1).
 *
 * @returns The dial rate (number of calls to dial).
 *
 * Example usage:
 * const answerRate: Percentage = 0.5;  // 50% answer rate
 * const availableAgents: PositiveInteger = 10;
 * const abandonRateTarget: Percentage = 0.03;  // 3% abandon rate target
 *
 * console.log(calculateDialRate(answerRate, availableAgents, abandonRateTarget));  // This will output the dial rate
 */
const calculateDialRate = (
    answerRate: Percentage,
    availableAgents: PositiveInteger,
    abandonRateTarget: Percentage
): PositiveInteger => {
    if (
        !validatePercentage(answerRate) ||
        !validatePositiveInteger(availableAgents) ||
        !validatePercentage(abandonRateTarget)
    ) {
        throw new Error("Invalid input values.");
    }

    // Adjust the number of available agents based on the abandon rate target
    const adjustedAgents: number =
        availableAgents + availableAgents * abandonRateTarget;

    // Calculate the dial rate
    const dialRate: number = adjustedAgents / answerRate;

    // Since we're working with discrete values, round up to ensure that the expected number of answered calls doesn't exceed the number of available agents.
    return Math.ceil(dialRate) as PositiveInteger;
};

export default calculateDialRate;

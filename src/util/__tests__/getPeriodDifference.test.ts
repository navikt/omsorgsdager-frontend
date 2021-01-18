import { getPeriodAsListOfDays, getPeriodDifference } from '../dateUtils';
import { Period } from '../../types/Period';

describe('getPeriodDifference', () => {
    const basePeriod = new Period('01-01-2019', '01-31-2019');
    const basePeriodDays = getPeriodAsListOfDays(basePeriod);

    const listOfOtherPeriods = [
        new Period('12-01-2018', '12-30-2018'),
        new Period('12-30-2018', '01-03-2019'),

        new Period('01-10-2019', '01-15-2019'),
        new Period('01-20-2019', '01-25-2019'),

        new Period('01-30-2019', '02-03-2019'),
        new Period('02-20-2019', '02-25-2019'),
    ];

    let differingPeriods = [],
        differingDays = [];

    beforeAll(() => {
        differingPeriods = getPeriodDifference(basePeriod, listOfOtherPeriods);
        differingDays = differingPeriods.map(getPeriodAsListOfDays).flat();
    });

    it("should only return periods that are within the base period's start and end", () => {
        differingDays.forEach((day) => expect(basePeriodDays.includes(day)).toBe(true));
    });

    it('should not return a period that includes any day in the list of other periods', () => {
        const daysThatShouldBeExcluded = listOfOtherPeriods.map(getPeriodAsListOfDays).flat();
        const intersect = differingDays.filter((day) => daysThatShouldBeExcluded.includes(day));
        expect(intersect.length).toBe(0);
    });

    it('should return every list of subsequent days with difference as its own period', () => {
        expect(differingPeriods.length).toBe(3);
    });
});

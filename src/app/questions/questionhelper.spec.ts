import { QuestionHelper } from './questionhelper';
import { mockQuestionsJson } from '../jsonresponse.mock';

const mockAnswer1 = [
  { 'optionId': '015', 'checked': true },
  { 'optionId': '012', 'checked': true },
  { 'optionId': '011', 'checked': true },
  { 'optionId': '014', 'checked': true },
  { 'optionId': '002', 'checked': true },
  { 'optionId': '013', 'checked': true },
  { 'optionId': '003', 'checked': true }
];
const mockAnswer2 = [{ 'optionId': '011', 'checked': true }];
const mockAnswer3 = [{ 'optionId': '011', 'checked': false }];

describe('UserComponent', () => {
  beforeEach(() => {
  });

  it('should calculate max points', () => {
    expect(QuestionHelper.calculateMaxPoints(mockQuestionsJson[0])).toBe(3);
    expect(QuestionHelper.calculateMaxPoints(mockQuestionsJson[1])).toBe(4);
  });
  it('should calculate user points', () => {
    expect(QuestionHelper.calculateUserPoints(mockQuestionsJson[0], mockAnswer1)).toBe(2);
    expect(QuestionHelper.calculateUserPoints(mockQuestionsJson[1], mockAnswer1)).toBe(3);
    expect(QuestionHelper.calculateUserPoints(mockQuestionsJson[0], mockAnswer2)).toBe(0);
    expect(QuestionHelper.calculateUserPoints(mockQuestionsJson[1], mockAnswer2)).toBe(-1);
    expect(QuestionHelper.calculateUserPoints(mockQuestionsJson[0], mockAnswer3)).toBe(0);
    expect(QuestionHelper.calculateUserPoints(mockQuestionsJson[1], mockAnswer3)).toBe(0);
  });
});

import { parseFromUrl } from '../parser';

describe('parseFromUrl', () => {
  it('parses from url', async () => {
    const url = 'https://docs.google.com/uc?export=download&id=1q2WkwkL3adsMntZiGW9RNA1ldARDGJYM';
    const result = await parseFromUrl(url);
    expect(result).toMatchSnapshot();
  });
});

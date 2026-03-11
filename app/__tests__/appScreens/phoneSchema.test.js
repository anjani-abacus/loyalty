import { phoneSchema } from '../../src/core/components/ValidationSchema/SchemaProfile';

describe('phoneSchema', () => {
  test('accepts valid 10-digit number', async () => {
    await expect(phoneSchema.validate({ phoneNumber: '9876543210' })).resolves.toBeTruthy();
  });

  test('rejects short numbers', async () => {
    await expect(phoneSchema.validate({ phoneNumber: '123' })).rejects.toThrow();
  });

  test('rejects empty', async () => {
    await expect(phoneSchema.validate({ phoneNumber: '' })).rejects.toThrow();
  });
});

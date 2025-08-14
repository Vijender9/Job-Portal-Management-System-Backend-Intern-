```javascript
// src/constants.test.js
import { DB_NAME } from './constants';

describe('Constants', () => {
  describe('DB_NAME', () => {
    it('should export the correct database name', () => {
      expect(DB_NAME).toBe('my_application_db');
    });

    it('should export a non-empty string', () => {
      expect(DB_NAME).toBeDefined();
      expect(typeof DB_NAME).toBe('string');
      expect(DB_NAME.length).toBeGreaterThan(0);
    });

    // Edge case: Ensure it doesn't accidentally become an empty string or null/undefined
    it('should not be an empty string', () => {
      expect(DB_NAME).not.toBe('');
    });
  });
});
```
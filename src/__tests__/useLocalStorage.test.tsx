
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useLocalStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial value when localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null);

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));

    expect(result.current[0]).toBe('initial-value');
  });

  it('should return parsed value from localStorage', () => {
    const testData = { name: 'test', value: 123 };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(testData));

    const { result } = renderHook(() => useLocalStorage('test-key', {}));

    expect(result.current[0]).toEqual(testData);
  });

  it('should save value to localStorage when setValue is called', () => {
    localStorageMock.getItem.mockReturnValue(null);

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('new-value');
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'test-key',
      JSON.stringify('new-value')
    );
    expect(result.current[0]).toBe('new-value');
  });

  it('should support functional updates', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(1));

    const { result } = renderHook(() => useLocalStorage('test-key', 0));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(2);
  });

  it('should remove value from localStorage when removeValue is called', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify('test'));

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[2](); // removeValue function
    });

    expect(localStorageMock.removeItem).toHaveBeenCalledWith('test-key');
    expect(result.current[0]).toBe('initial');
  });

  it('should handle localStorage errors gracefully', () => {
    const onError = jest.fn();
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('localStorage error');
    });

    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial', { onError })
    );

    expect(result.current[0]).toBe('initial');
    expect(onError).toHaveBeenCalled();
  });

  it('should handle setItem errors gracefully', () => {
    const onError = jest.fn();
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error('Storage quota exceeded');
    });

    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial', { onError })
    );

    act(() => {
      result.current[1]('new-value');
    });

    expect(onError).toHaveBeenCalled();
  });

  it('should use custom serialization functions', () => {
    const serialize = jest.fn((value) => `custom:${value}`);
    const deserialize = jest.fn((value) => value.replace('custom:', ''));
    
    localStorageMock.getItem.mockReturnValue('custom:test-value');

    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial', { serialize, deserialize })
    );

    expect(deserialize).toHaveBeenCalledWith('custom:test-value');
    expect(result.current[0]).toBe('test-value');

    act(() => {
      result.current[1]('new-value');
    });

    expect(serialize).toHaveBeenCalledWith('new-value');
  });
});

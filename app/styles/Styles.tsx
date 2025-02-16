// import { StyleSheet } from 'react-native';
export function cardStyle(isDarkColorScheme: boolean, colors: any) {
  return {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.card,
    shadowColor: isDarkColorScheme ? '#333333' : '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDarkColorScheme ? 0.4 : 0.2,
    shadowRadius: 4,
    elevation: 4,
  };
}

export function subCardStyle(isDarkColorScheme: boolean) {
  return {
    marginTop: 16,
    backgroundColor: isDarkColorScheme ? '#1e293b' : '#f8fafc',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: isDarkColorScheme ? '#334155' : '#e2e8f0',
  };
}

export function inputStyle() {
  return {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    paddingHorizontal: 8,
  };
}

export function textColor(isDarkColorScheme: boolean) {
  return {
    color: isDarkColorScheme ? '#E4E4E7' : '#333',
  };
}

export function getHeadingTextColor(isDarkColorScheme: boolean) {
  return isDarkColorScheme ? 'text-zinc-100' : 'text-zinc-800';
}

export function getInputStyles(isDarkColorScheme: boolean) {
  return `h-12 rounded-lg border px-4 text-base ${
    isDarkColorScheme
      ? 'border-zinc-700 bg-zinc-800 text-zinc-100'
      : 'border-gray-200 bg-white text-zinc-800'
  }`;
}

export function getSecondaryTextColor(isDarkColorScheme: boolean) {
  return isDarkColorScheme ? 'text-zinc-400' : 'text-zinc-500';
}

export function getDividerColor(isDarkColorScheme: boolean) {
  return isDarkColorScheme ? 'bg-zinc-700' : 'bg-gray-200';
}

export function getSocialButtonStyles(isDarkColorScheme: boolean) {
  return `h-12 w-full flex-row items-center justify-center rounded-lg border ${
    isDarkColorScheme ? 'border-zinc-700 bg-zinc-800' : 'border-gray-200 bg-white'
  }`;
}

export function getPlaceholderColor(isDarkColorScheme: boolean) {
  return isDarkColorScheme ? '#71717a' : '#9ca3af';
}

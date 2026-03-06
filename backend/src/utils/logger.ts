type LogLevel = 'info' | 'warn' | 'error';

interface ILogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

function formatEntry(entry: ILogEntry): string {
  const ctx = entry.context ? ` ${JSON.stringify(entry.context)}` : '';
  return `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}${ctx}`;
}

function createEntry(level: LogLevel, message: string, context?: Record<string, unknown>): ILogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    context,
  };
}

const logger = {
  info(message: string, context?: Record<string, unknown>): void {
    const entry = createEntry('info', message, context);
    process.stdout.write(formatEntry(entry) + '\n');
  },

  warn(message: string, context?: Record<string, unknown>): void {
    const entry = createEntry('warn', message, context);
    process.stdout.write(formatEntry(entry) + '\n');
  },

  error(message: string, context?: Record<string, unknown>): void {
    const entry = createEntry('error', message, context);
    process.stderr.write(formatEntry(entry) + '\n');
  },
};

export default logger;

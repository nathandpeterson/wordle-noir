import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App';

describe('App', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the noir case file shell with the current date', () => {
    vi.setSystemTime(new Date(2026, 5, 17));

    render(<App />);

    expect(
      screen.getByRole('heading', { name: /wordle noir/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /06172026/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/awaiting a lead/i)).toBeInTheDocument();
  });
});

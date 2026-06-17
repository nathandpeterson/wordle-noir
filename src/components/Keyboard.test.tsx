import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Keyboard from './Keyboard';

describe('Keyboard', () => {
  it('renders all placeholder letter keys and command keys', () => {
    render(<Keyboard />);

    for (const letter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
      expect(screen.getByRole('button', { name: letter })).toBeInTheDocument();
    }

    expect(screen.getByRole('button', { name: /enter/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });
});

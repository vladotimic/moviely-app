import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppContextProvider } from '@/context';

interface IExtendedRenderOptions extends RenderOptions {
  initialEntries?: string[];
}

const customRender = (
  ui: ReactElement,
  options?: Omit<IExtendedRenderOptions, 'wrapper'>,
) => {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <AppContextProvider>
        <MemoryRouter initialEntries={options?.initialEntries ?? ['/']}>
          {children}
        </MemoryRouter>
      </AppContextProvider>
    );
  }

  render(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';
export { customRender as render };

import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppContextProvider, IAppContext } from '@/context';

interface IExtendedRenderOptions extends RenderOptions {
  context?: IAppContext;
  initialEntries?: string[];
}

const customRender = (
  ui: ReactElement,
  options?: Omit<IExtendedRenderOptions, 'wrapper'>,
) => {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MemoryRouter initialEntries={options?.initialEntries ?? ['/']}>
        <AppContextProvider context={options?.context}>
          {children}
        </AppContextProvider>
        ;
      </MemoryRouter>
    );
  }

  render(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';
export { customRender as render };

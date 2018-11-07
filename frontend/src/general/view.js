import React from 'react';
import styled from 'styled-components';
import { Theme } from '../common';

const Default = styled.View``;

const BasicView = styled.View`
  flex: ${({ stretch }) => (stretch ? 1 : 0)};
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
`;

const WithWindowPadding = styled(BasicView)`
  padding-left: ${Theme.sizes.spaces.window.left};
  padding-right: ${Theme.sizes.spaces.window.right};
`;

const View = {
  basic: ({ children }) => <Default>{children}</Default>,
  row: ({
    children, justifyContent = 'flex-start', alignItems = 'center', stretch = false,
  }) => (
    <BasicView
      stretch={stretch}
      justifyContent={justifyContent}
      alignItems={alignItems}
      direction="row"
    >
      {children}
    </BasicView>
  ),
  rowPadding: ({
    children,
    justifyContent = 'flex-start',
    alignItems = 'flex-start',
    stretch = false,
  }) => (
    <WithWindowPadding
      stretch={stretch}
      justifyContent={justifyContent}
      alignItems={alignItems}
      direction="row"
    >
      {children}
    </WithWindowPadding>
  ),
  column: ({
    children,
    justifyContent = 'flex-start',
    alignItems = 'flex-start',
    stretch = false,
  }) => (
    <BasicView
      stretch={stretch}
      justifyContent={justifyContent}
      alignItems={alignItems}
      direction="column"
    >
      {children}
    </BasicView>
  ),
  columnPadding: ({
    children,
    justifyContent = 'flex-start',
    alignItems = 'flex-start',
    stretch = false,
  }) => (
    <WithWindowPadding
      stretch={stretch}
      justifyContent={justifyContent}
      alignItems={alignItems}
      direction="column"
    >
      {children}
    </WithWindowPadding>
  ),
};

export default View;

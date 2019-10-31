import * as React from 'react';
import { observer } from 'mobx-react-lite';

import {
  StyledApp,
  StyledFind,
  Input,
  Button,
  Buttons,
  SearchIcon,
  Occurrences,
} from './style';
import { icons } from '~/browserui/resources/constants';

const close = () => {
};

const onInput = async () => {

};

const move = (forward: boolean) => async () => {
};

const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    move(true)();
  }
};

const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Escape') {
    close();
  }
};

export const App = observer(() => {
  return (
    <StyledApp>
      <StyledFind>
        <SearchIcon style={{ filter: 'none' }} />
        <Input
          autoFocus
          onKeyPress={onKeyPress}
          onChange={onInput}
          placeholder="Find in page"
        />
        <Occurrences>{}</Occurrences>
        <Buttons>
          <Button onClick={move(false)} icon={icons.up} size={20} />
          <Button onClick={move(true)} icon={icons.down} size={20} />
          <Button onClick={close} icon={icons.close} size={16} />
        </Buttons>
      </StyledFind>
    </StyledApp>
  );
});
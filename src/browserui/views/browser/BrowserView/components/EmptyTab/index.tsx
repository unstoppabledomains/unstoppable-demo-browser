import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Input } from './style';
import { SearchBar, SearchIcon, Microphone } from './style';
import { BookMarkArea, BookMarkButtonBox1, BookMarkButton1, TextLabel1 } from './style';
import { BrowserSession } from '~/browserui/models/browser-session';


var bookmarksData = [
  { "id": 1, "name": "something1toolongfortheavailablespace", "thumb": "https://sjc5.discourse-cdn.com/sitepoint/community/user_avatar/www.sitepoint.com/ryanreese/45/54672_2.png", "url": "https://www.w3schools.com/" },
  { "id": 2, "name": "some", "thumb": "https://www.w3schools.com/images/colorpicker.png", "url": "http://somethingelse1.com" },
  { "id": 3, "name": "something", "thumb": "https://www.w3schools.com/images/colorpicker.gif", "url": "http://somethingelse2.com" },
  { "id": 4, "name": "something", "thumb": "https://www.w3schools.com/images/colorpicker.gif", "url": "http://somethingelse3.com" },
  { "id": 5, "name": "something", "thumb": "https://www.w3schools.com/images/colorpicker.gif", "url": "http://somethingelse4.com" },
  { "id": 6, "name": "something2toolongfortheavailablespace", "thumb": "https://avatars0.githubusercontent.com/u/57091020?s=40&v=4", "url": "http://somethingelse5.com" },
  { "id": 7, "name": "something3toolongfortheavailablespace", "thumb": "https://www.w3schools.com/images/colorpicker.gif", "url": "http://somethingelse6.com" },
  { "id": 8, "name": "thing4toolongfortheavailablespace", "thumb": "https://www.w3schools.com/images/colorpicker.gif", "url": "http://somethingelse7.com" }
];

let currentSession: BrowserSession = null;

const handleMicrophoneClick = () => {
  currentSession.selectedTab.url = currentSession.selectedTab.urlBarValue;
}

const handleBookMarkButton1Click = (bookmarkData: any) => {
  console.log(bookmarkData);
  //currentSession.selectedTab.url = bookmarkData.url;
}

const handleUrlBarChange = (event: any) => {
  if (currentSession.selectedTab) {
    currentSession.selectedTab.urlBarValue = event.target.value;
  }
}

var BookMarkButtons = () => {
  var bookmarks = bookmarksData.map(item => (
    <BookMarkButtonBox1 key={item.id} onClick={() => handleBookMarkButton1Click(item)}>
      <BookMarkButton1>
        <img style={{ "width": "100%", "height": "100%" }} src={item.thumb} /><a href={item.url} />
      </BookMarkButton1>
      <TextLabel1>{item.name}</TextLabel1>
    </BookMarkButtonBox1>
  ));

  return bookmarks;
}

export const EmptyTab = observer(({ visible, browserSession }: { visible: boolean, browserSession: BrowserSession }) => {
  currentSession = browserSession;

  var pageStyle: any = {
    display: visible ? "block" : "none",
    boxSizing: 'border-box',
    height: '100%'
  }

  return (
    <div style={pageStyle}>
      <Container>
        <SearchBar>
          <Input type="text" placeholder="Please tell me how to..."
            value={browserSession.currentUrlBarValue}
            onChange={handleUrlBarChange} />
          <SearchIcon />
          <Microphone onClick={handleMicrophoneClick}>
          </Microphone>
        </SearchBar>
        <BookMarkArea onClick={handleBookMarkButton1Click}>
          {BookMarkButtons()}
        </BookMarkArea>
      </Container>
    </div>
  )
})
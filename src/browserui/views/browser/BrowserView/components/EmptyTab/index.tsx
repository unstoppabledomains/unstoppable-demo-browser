import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Input } from './style';
import { SearchBar, SearchIcon, Microphone } from './style';
import { BookMarkArea, BookMarkButtonBox1, BookMarkButton1, TextLabel1 } from './style';
import { BrowserSession } from '~/browserui/models/browser-session';

const clickHandler = () => {
  console.log("Clicked!!!!");
}

var bookmarksData = [
  { "name": "something1toolongfortheavailablespace", "thumb": "https://sjc5.discourse-cdn.com/sitepoint/community/user_avatar/www.sitepoint.com/ryanreese/45/54672_2.png", "url": "https://www.w3schools.com/" },
  { "name": "some", "thumb": "https://www.w3schools.com/images/colorpicker.png", "url": "http://somethingelse1.com" },
  { "name": "something", "thumb": "https://www.w3schools.com/images/colorpicker.gif", "url": "http://somethingelse2.com" },
  { "name": "something", "thumb": "https://www.w3schools.com/images/colorpicker.gif", "url": "http://somethingelse3.com" },
  { "name": "something", "thumb": "https://www.w3schools.com/images/colorpicker.gif", "url": "http://somethingelse4.com" },
  { "name": "something2toolongfortheavailablespace", "thumb": "https://avatars0.githubusercontent.com/u/57091020?s=40&v=4", "url": "http://somethingelse5.com" },
  { "name": "something3toolongfortheavailablespace", "thumb": "https://www.w3schools.com/images/colorpicker.gif", "url": "http://somethingelse6.com" },
  { "name": "thing4toolongfortheavailablespace", "thumb": "https://www.w3schools.com/images/colorpicker.gif", "url": "http://somethingelse7.com" }
];

let currentSession: BrowserSession = null;

const handleMicrophoneClick = () => {
  currentSession.selectedTab.url = currentSession.selectedTab.urlBarValue;
}

const handleBookMarkButton1Click = (bookmarkData:any) => {
  console.log(bookmarkData);
  //currentSession.selectedTab.url = bookmarkData.url;
}

const handleUrlBarChange = (event: any) => {
  if (currentSession.selectedTab) {
    currentSession.selectedTab.urlBarValue = event.target.value;
  }
}

var BookMarkButtons = () => {
  var bookmarks = [];

  for (var i = 0; i < bookmarksData.length; i++) {
    console.log(bookmarksData[i].name);
    bookmarks.push(
      <BookMarkButtonBox1 onClick={() => handleBookMarkButton1Click(i)}>
        <BookMarkButton1>
          <img style={{ "width": "100%", "height": "100%" }} src={bookmarksData[i].thumb} /><a href={bookmarksData[i].url} />
        </BookMarkButton1>
        <TextLabel1>{bookmarksData[i].name}{i}</TextLabel1>
      </BookMarkButtonBox1>
    )
  }

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
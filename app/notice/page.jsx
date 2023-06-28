import React from 'react'
import SmallHeader from '../components/Layout/SmallHeader/SmallHeader'
import Nav from '../components/Layout/Nav'
import PostingDetail from '../components/pages/Detail/PostingDetail/PostingDetail'
import PostingContent from '../components/pages/Detail/PostingContent/PostingContent'
import Postingcomment from '../components/pages/Detail/Postingcomment/Postingcomment';
import classes from './page.module.css'

export default function page() {
  const postingData = {
    content:"<b>작성 양식입니다.</b><br/><br/><p>글 제목에는 가수-곡제목 형식으로 작성 바랍니다.</p><br/><p>올릴때는 유튜브 영상과 가사를 첨부해주시길 바랍니다.</p><br/><p>댓글과 검색 기능은 구현중인 기능입니다.<p/><br/><br/><br/><br/><br/>",
    tag1:"notice",
    tag2:"notice",
    title:"게시물 작성 요령",
    username:"게시판 관리자"
  }
  return (
    <>
      <div className={classes.container}>
        <SmallHeader />
        <Nav />
        <main>
          <div className={classes.posting}>
            <PostingDetail postingData={postingData}/>
            <PostingContent postingData={postingData}/>
            <div/>
            <Postingcomment/>
          </div>
        </main>
      </div> 
    </>
  )
}

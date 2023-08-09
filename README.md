Crash (음악 추천사이트)
========
#### 사용자가 직접 게시물을 올릴 수 있는 웹사이트입니다. DB로는 firebase의 realtime db를 사용하였습니다.
*제작기간 6.6 ~ 7.3*

##### 사용 기술 : Next js
##### 사용 라이브러리 및 api : next-auth, naver login, firebase, react-quill(Text editor)
<br><br>
> 주요 코드 1
> * db에서 글 리스트를 불러오는 코드
> * firebase는 구간별로 데이터를 불러오는 것이 불가능하다. 하지만 한 번에 데이터를 불러오면 db를 쓰는 의미가 없다고 생각했기 때문에 뒤에서부터 10개씩 불러오는 방식을 선택하였다.
> * 페이지 정보는 10개씩 저장하고 그 개수에 맞춰서 pagination을 생성한다. pagination을 클릭하면 쿼리를 전달하고 그 정보에 맞춰서 어떤 정보를 불러올 지 정하게된다.

```js
  useEffect(() => {
    let recentPostRef;    // postRef를 저장하는 변수
    let pagenum = 1;    // page정보를 저장하는 변수
    if (searchParams && searchParams.get('page')) pagenum = searchParams.get('page')    // page의 params가 있을 경우 pagenum에 정보를 저장
    if (page === "all") {   // 전체 게시판일 경우
      recentPostRef = query(ref(db, 'user-posts/post'), limitToLast(pagenum * 10))    // 페이지에 맞춰서 10개씩만 불러옴
    }  
    else {    // 특정 게시판일 경우
      recentPostRef = query(ref(db, 'user-posts/post'), orderByChild("tag1"), equalTo(page), limitToLast(pagenum * 10))   // 지정한 게시판의 데이터만 10개씩 불러옴
    }
    onValue(recentPostRef, (snapshot) => {
      postingData.current = snapshot.val();
      setOn(true);
    });
  }, [searchParams])

  if (on && postingData.current) {
    let pagenum = 1;
    if (searchParams && searchParams.get('page')) pagenum = searchParams.get('page')
    postingDataCopy.current = Object.keys(postingData.current).reverse()    // 불러온 데이터를 최신순으로 배치
    postingDataCopy.current = postingDataCopy.current.slice((pagenum - 1) * 10, pagenum * 10);    // 불러온 데이터를 현재 페이지 정보에 맞게 자름

    postingList = postingDataCopy.current.map((key, index) => {
      const postingContent = postingData.current[key]
      if (page === "all") {
        return <Post key={key} page={page} id={key} postingContent={postingContent}/>
      }
      else {
        if (page === postingContent.tag1) return <Post key={key} page={page} id={key} postingContent={postingContent}/>
      }
    }
    )
  }
```
          
<br><br>
> 주요 코드 2
> * text editor에 유튜브 링크를 붙여넣으면 iframe 형식으로 변경해주는 코드

```js
  useEffect(() => {
    const urlSearch = text.current.search('https://youtu.be/')    // 붙여넣기한 text가 지정된 형식인지 검사

    if (urlSearch === 0) {    // youtube 주소일경우
      setThumbnail(text.current);   // 썸네일에 붙여넣기한 주소를 저장
      let youtubeUrl = text.current.replace('https://youtu.be/', 'https://youtube.com/embed/')   // youtube 링크를 iframe 형식에 맞춰서 주소 변환
      const iframeUrl = `<iframe
      width="590"
      height="315"
      src="${youtubeUrl}"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      >
    </iframe>`
      let copy = value
      if (copy !== "") {    // 맨 처음 작성 시 value값이 공백으로 인식될 때를 위한 코드
        copy = value.replace(text.current, iframeUrl)
        setValue(copy)
      }
      else setValue(iframeUrl)  // 주소 변환한 값으로 작성글에 저장
    }
    text.current = '' // 붙여넣기한 값을 저장한 변수 초기화
  }, [text.current])
  </code>
```
  
이 코드를 작성할 때 두가지 문제가 발생했다. csr 방식이 아닌 ssr 방식으로 동작하기 때문에 생기는 문제였다.
<br><br>

```js
    if (typeof window === 'object') {
    window.addEventListener('paste', (e) => {   // 붙여넣기를 하면 text에 정보를 저장
      const data = e.clipboardData;
      text.current = data.getData('text');
    })
  }
```

이처럼 window 함수를 사용하려면 window가 로딩이 됐는지를 먼저 체크해야한다.<br>
ssr의 경우 서버 측에서 html을 작성하는데 서버에서는 window가 정의되지 않기 때문에 생기는 문제인 것 같다.
<br><br>

```js
   const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {    // 클라이언트 측에서 동적으로 모듈을 로딩하게 하는 방법. 안하면 오류가 발생
    ssr: false,
    loading: () => <p>Loading ...</p>,
  })
```

또 외부 라이브러리 중 ssr 방식을 지원하지 않는 경우 dynamic import를 사용해야 한다.<br>
위와 같은 이유로 client 측에서 렌더링시키는 방식으로 해결

<br><br>

>느낀 점
> * 수업 중에 다루지 않았던 Next js를 활용한 프로젝트이다
> * 최근 버전이 바뀌면서 사용방법이 크게 바뀌었다. 2022년 6월 이전의 글들은 의미가 없어졌기 때문에 자료를 찾기가 무척 힘들었다.
> * 또한 배포 방식이 react와는 많이 달랐고 build 과정에서도 크고 작은 에러가 발생해 애를 먹었던 프로젝트이다.

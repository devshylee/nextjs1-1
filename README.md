# nextjs1-1
## 9월 11일 수업내용
### ECMAScript 기능 중 파이프라인 연산자를 사용해보자
```JavaScript
console.log(Math.random() * 10);
// 파이프라인 연산자를 사용하면 위 코드를 아래와 같이 바꿀 수 있다.
Math.random()
  |> (_ => _ * 10)
  |> console.log;

```

### BootStrap, SCSS, SASS

### 몇 가지 일어날 수 있는 오류
처음 Next 프로젝트를 생성할 때 오류로 생성되지 안흔ㄴ 경우가 있다.
이 것은 CRA가 설치되지 않아서 생기는 현성
이런 경유는 다음과 같이 create-reacpt-app을 Global로 설치해 주면 됩니다.
npm i -g create-react-app
이제 프로젝트를 생성합니다.
Next.js 12 이후 babel을 지원이 중지 되었습니다. 이제 SWC로 그 기능이 대체 되었다.
따라서 최신 환경에서 babel설정을 하게 되면 오류가 발생한다.
당연히 babel을 제거하면 오류는 사라진다.
만일 SWC를 사용하고 싶다면 다음과 같이 12 혹은 최신 버전의 Next프로젝트를 생성해주면 자동으로 설정된다.

### Transpile은 어떻게 동작하나
Babel은 ECMAScript와 같은 자바스크립트 최신 버전이나 TypeScript를 이전 버전의 코드로 변환시켜주는 Transpile 도구다.  
개발자가 작성한 코드 -> Parse -> Transform > Generate -> 이전 버전의 코드  
Babel의 parser는 자바스크립트를 컴퓨터가 이해할 수 있는 코드 구조인 Abstarct Syntax Tree로 변환해 주는 역할을 수행한다.  
Babel의 traverse모듈은 전체 트리 상태를 유지하며 노드 교체 제거 추가를 담당합니다.  
마지막 generator가 수정된 AST를 일반 코드로 변환해 주게 됩니다.  

SWC도 Babel과 같은 자바스크립트 트랜스 컴파일러 입니다.  
Next12 이후부터 Babel에서 SWC로 교체되었습니다  
SWC는 Rust로 작성되어 속도가 훨씬 빠릅니다.  

### 왜 SWC를 사용해야 하는가
Babel의 단점  
Babel로 변환된 코드를 이해하기 어렵다.  
원 코드에 비해 변환 코드의 길이가 늘어난다  
변환에 시간이 많이 걸린다.  

SWC의 장점  
확장성: 개발자들은 라이브러리를 fork 해올 필요 없이 Next JS에 미리 설치된 SWC를 사용할 수 있다.  
WebAssembly: Rust의 WASM(WebAssembly) 지원으로 어떤 종류의 플랫폼에서도 Next JS 개발을 할 수 있다.  
성능: 다른 컴파일러들보다 훨씬 좋은 성능을 제공한다.  
커뮤니티 지원: 빠르게 성장하는 커뮤니티를 가지고 있다.  

### 렌더링 전략
렌더링 전략이란 웨 ㅂ페이지 또는 웹애플리케이션을 웹 브라우저에 재공하는 방법을 의미합니다.
정적인 페이지 제작하는 Gatsby를 추천합니다.

그런데 Next.js에서는 이 모든 방법을 완전히 새로운 수준으로 제공합니다.
어떤 페이지는 빌드 시점에 정적으로 생성하고, 어떤 페이지는 실행 시점에 동적으로 생성할지 쉽게 정할 수 있습니다.
또한 특정 페이지에 대한 요청이 있을 때 마다 페이지를 다시 생성할 수도 있습니다.
그리고 반드시 클라이언트에서 렌더링해야 할 컴포넌트도 지정할 수 있어서 개발이 쉽습니다.

### 서버 사이드 렌더링
APM을 이용하는 일반적인 웹 페이지 생성이라고 보면 됩니다.
여기에 자바스크립트 코드가 적재되면 동적으로 페이지 내용을 렌더링합니다.

Next.js도 이와 같이 동적으로 페이지를 렌더링할 수 있습니다.
그리고 여기에 스크립트 코드를 집어 넣어서 나중에 웹페이지를 동적으로 처리할 수도 있는데 이를 하이드레이션이라고 합니다.

예를 들면 어떤 사입이 작성한 블로그 글을 한 페이지에 모아서 작성해야 한다면 SSR을 이용하는 것이 적당합니다.
서버 사이드 렌더링 -> 자바스크립트가 하이드레이션된 페이지를 전송 -> 클라이언트에서 DOM위에 각 스크립트 코드를 하이드레이션 : 페이지 새로고침 없이 사용자와 웹 페이지간 상호 작용을 가능하게 한다.

SSR의 장점
첫 페이지 로딩 속도가 클라이언트 사이드 렌더링에 비해 더 빠릅니다.
해당 첫 페이지에 해당하는 문서만 브라우저에게 전달하여 브라우저가 렌더링하기 때문에 초기 로딩 속도가 클라이언트 사이드 렌더링에 비해 더 빠릅니다.
검색엔진최적화(SEO)가 가능합니다.


## 9월 4일 수업내용
### 1. app-route, page-route 차이


기본적으로 Nextjs프로젝트를 생성하는 방법은 다음과 같다
npx create-next-app@latest

npm을 기본으로 사용하고 싶다면 다음 명령으로 설정을 덮어줄 수 있다.
npx create-next-app <app-name> -use-npm

또 다른 프로젝트 생성 방법으로는 github 저장소에서 원하는 보일러플레이트 코드를 다운로드해서 새 Next.js 프로젝트를 시작할 수도 있다.
npx create-next-app--example <보일러플레이트 이름>
npx create-next-app--example blog-starter

approtue about폴더 생성 후 page.js를 생성해야 라우팅됨

### 2. 프로젝트의 기본 구조
pages/ 디렉토리 안의 모든 js파일은 public 페이지가 됩니다.  

pages/의 index.js파일을 복사해서, about.js로 이름을 바꾸면 locaghost:3000/about으로 접속할 수 있다.  

public/ 디렉토리에는 웹 사이트의 모든 퍼블릭 페이지의 정적 콘텐츠가 있다.  

이미지, 컴파일된 css, 컴파일된 js, 폰트 등 용도가 정해져 있는 디렉토리는 pages/ 와 public/ 뿐이다.

### 3. Next.js 14의 프로젝트의 기본 구조
프로젝트를 생성할 때 /src를 사용 여부를 선택할 수 있고, 일반적으로 사용한다.  

14에서는 /public과 /src/app 디렉토리만 용도가 정해져 있다.

### 4. 타입스크립트 지원
Next.js는 타입스크립트로 작성되었기 떄문에 고품질의 type definition을 지원한다.  

기본 언어를 타입스크립트로 지정하려면 root에 tsconfig.json이라는 설정파일을 생성하면 된다.  

그런 다음 npm run dev 명령을 실행하면 다음과 같은 메세지를 확인할 수 있다.  

이 메시지는 주 언어에 대한 의존성 패키지를 설치해달라는 내용이다.  

패키지를 설치하고 나면 비어 있던 tsconfig.json파일의 내용이 자동으로 채워진다.

### 5. 웹팩과 바벨 설정 커스터마이징
바벨이나 웹팩의 설정도 커스터마이징 할 수 있다.  

바벨은 자바스크립트 트랜스컴파일러이며 최신 자바스크립트 코드를 하위 호환성을 보장하는 스크립트 코드로 변환하는 일을 담당한다.  

하위 호환성이 보장되면 어떤 웹 브라우저에서든 자바스크립트 코드를 실행할 수 있다.  

바벨을 사용하면 브라우저나 Nodejs 등에서 지원하지 않는 세톱과 훌륭한 기능을 현재의 환경에서도 실행할 수 있습니다.  

Nodejs에서 실행하면 오류가 나지만 바벨과 사용하면 실행가능한 ECMAScript코드로 바꿔줄 수 있는 예를 확인할 수 있다.  

바벨 설정을 커스터마이징 하려면 프로젝트 Root에 .bablerc 라는 파일을 생성하면 된다.  

이 설정 파일을 비워두면 오류가 발생하기 때문에 최고한 다음의 내용을 저장해야 한다.
```JavaScript
{
  "presets" : ["next/bable"]
}
```

### ECMAScript 기능 중 파이프라인 연산자를 사용해보자
파이프라인은 공식적으로 체택되지 않은 연산자  

기능을 사용하려면 바벨플러그인을 설치해야함  

그리고 .bablerc파일을 다음과같이 수정  


## 8월 28일 수업내용

### 1. 코드 분할
Next.js는 코드 분할을 자동으로 수행함   

각 페이지는 해당 페이지에 필요한 부분만 로드함  

홈페이지가 렌더링될 때 다른 페이지의 코드는 처음에 제공되지 않음

### 2. 서버 사이드 렌더링
일반적으로 클라이언트 사이드에서 동작하는 싱글 페이지 앱(SPA)을 서버에서 렌더링한 다음 완전히 렌더링된 페이지를 클라이언트로 보내는 인기있는 기술

### 3. 정적사이트 생성
빌드 타임에 HTML 페이지를 미리 생성하여 빠른 로딩 속도와 SEO 최적화를 제공

### 4. 증분 정적 컨텐츠 생성
Next.js의 핵심 기능 중 하나로, 정적 사이트 생성(Static Site Generation, SSG)과 서버사이드 렌더링(Server-Side Rendering, SSR)을 결합하는 혁신적인 방법  

웹 사이트의 일부 페이지를 정적으로 생성하면서 해당 페이지의 콘텐츠를 동적으로 업데이트할 수 있는 기능입니다. 이것은 정적 사이트 생성과 서버사이드 렌더링의 장점을 결합한 하이브리드 방식

### 5. Next.js란
Next.js는 풀스택 웹 애플리케이션을 구축하기 위한 React 프레임워크입니다. 현대적인 웹 애플리케이션 개발 과정을 간소화하는데 사용된다.  

Vercel1에서 개발된 Next.js는 서버 사이드 렌더링, 정적 사이트 생성, API 개발에 대한 쉬운 솔루션을 제공하는 데 중점을 둔다.  

React의 강력함과 유연성을 더해 고급 성능 최적화와 내장된 개발 기능을 제공함으로써, Next.js는 개발자들이 쉽게 빠르고 확장 가능하며 SEO 친화적인 웹 애플리케이션을 구축할 수 있도록 지원한다.

### 6. Next.js 장점
Next.js는 React의 강력하고 유연한 프레임워크로, 성능, SEO, 개발자 경험을 위한 고급 기능과 최적화를 제공한다.  

서버 사이드 렌더링, 정적 사이트 생성, 통합된 API 개발의 지원을 통해 Next.js는 다양한 웹 개발 요구 사항에 포괄적인 솔루션을 제공한다.

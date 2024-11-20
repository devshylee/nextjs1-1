# nextjs1-1
# 201930122 이성현

## 11월 20일 수업내용
### Props 흐름의 이해
Next.js의 데이터 흐름은 단방향으로 이루어 집니다.
즉 parents에서 child component의 방향으로 props의 흐름이 이루어짐니다.
따라서 계층 구조가 복잡해 지면 props drilling문제가 발생합니다.
props drilling은 여러 개의 component를 지나 props가 전달 되면서 발생하는 문제입니다.

 props drilling은 다음과 같은 문제를 발생 시킬 수 있습니다.
 1. 중간에 위치한 component에 불필요한 props를 전달해야 하는 문제
 2. 타겟 component까지 props가 전달되지 않을 경우 원인 규명이 어려움
 3. 필요 이상으로 코드가 복잡해 지는 문제
 이런 문제를 해결하려면 props를 전역으로 사용하면 됩니다.
 Next.sj에서 props를 ㅈ전역으로 사용하기 위해서 Context API, Redux등을 사용합니다.
   - props drilling 이미지

Component A, B, C, props-flow 페이지 상호간에는 계층구조를 가지고 있지 않습니다.
아직 어느 쪽에서도 component 호출하지 않았기 떄문입니다.
그러나 어느 쪽이든 component를 호출 하는 순간, 호출한 쪽은 parent가 되고, 호출 받은 쪽은 child가 됩니다.
이것은 component간, component와 page간 모두에 적용됩니다.
관계가 한번 성립되면 child가 parent를 호출할 수는 없습니다.
예를 들어 A가 B를 호출한 경우, A는 parent, B는 child가 됩니다.
이 관계는 아직 아무도 호출하지 않거나, 호출 받지 않은 C에게는 적용되지 않습니다.
즉, C는 A, B모두 호출 할 수 있게 됩니다. 이 경우 C가 parent, A와 B child가 됩니다.
A와 B의 관계, C와 A, B의 관계가 공존하게 됩니다.
A는 B만 호출 할 수 있고, C는 AB 모두를 호출할 수 있으며 그 반대는 불가능 합니다.
그리고 B는 아무 것도 호출할 수 없고, A는 C를 호출할 수 없는 관계가 됩니다.

### Context API
Context는 IX구축에 많이 사용되는 React의 기능입니다.
React는 16.3 버전부터 정식적으로 context api를 지원하고 있습니다.
일반적으로 props는 부모에서 자식으로 전달되는 단방향 통신을 합니다.
Context Api는 특정 component가 props를 사용하지 않고 하위 component를 포함한 모든 component에 데이터를 공유할 수 있는 기능을 제공합니다.
즉 전역으로 데이터를 사용할 수 있도록 해줍니다.
예를 들어 사용자의 로그인 상태나 쇼팡커트의 물품 수량 등을 표시할 때 사용됩니다.

간혹 COnsumer를 useContext대신 사용하는 경우가 있지만 function형 component에서는 많이 사용하지 않습니다.
|특징|Consumer|useContext|
|------|---|---|
|사용|클래스형, 함수형 컴포넌트 모두 사용 가능|함수형 컴포넌트에서 주로 사용|
|문법|JSX 내에서 명시적으로 작성|Hook으로 간결하게 사용|
|장점|클래스형 컴포넌트와의 호환성|간결하고 직관적인 코드 작성, 함수형 컴포넌트와의 자연스러운 통합|
|단점|JSX내에 추가적인 요소 필요|클래스형 컴포넌트에서는 사용할 수 없음|

Context API를 이용한 다크모드 토글 예제를 통해 context의 사용법에 관해 알아 보도록 하겠습니다.

앞에서 작성한 코드 상단에 'use client' 지시문이 있습니다.
Next.js에서 'use client' 를 사용하는 이유는 서버 컴포넌트와 클라이언트 컴포넌트를 구분하기 위해서 입니다.
Next.js는 기본적으로 서버에서 렌더링하도록 설계되어 클라이언트에서만 필요한 컴포넌트를 명시적으로 지정해야 할 필요가 있습니다.
'use client'를 컴포넌트 상단에 선언하면 해당 컴포넌트는 클라이언트에서만 렌더링되며, 주로 상태 관리나 브라우저 전용 API 사용이 필요한 경우에 사용됩니다.

### 디렉토리 구조
app : Routing Page 관리
components : 재사용 가능한 공통 컴포넌트 관리
context : context 컴포넌트 관리
feature : 프로젝트의 주요 기능별로 디렉토리를 나누어 해당 기능과 관련된 페이지, 컴포넌트, 로직을 관리.

components Directory
애플리케이션 전반에서 재사용 될 수 있는 공통 컴포넌트를 보관합니다.
특정 기능에 종속되지 않으며 다양한 페이지나 기능에서 재사용할 수 있는 component를 모아 둡니다.

feature Directory
특정 기능이나 도메인 별로 코드를 구성하는데 사용합니다
사용자 인증 기능 프로필 관리 기능 등 각 기능과 관련된 상태 관리 API 요청 슬라이스 컴포넌트 등을 보관합니다.
재 사용이 불가능하거나 가능하더라도 많은 수정을 해야 하는 컴포넌트를 관리합니다.

redux slice
slice는 redux toolkit에서 사용되는 용어로 특정 기능과 관련된 상태와 reducer 함수의 도움을 나타냅니다.
slice라는 이름은 애플리케이션 상태의 한 부분을 의미합니다
redux toolkit의 createSlice 함수를 사용하면 특정 기능과 관련된 상태 액션 reducer를 한 곳에서 정의할 수 있어 관리하기가 용이합니다.

redux provider
redux prover는 redux의 상태 등을 공급하기 위한 파일입니다.
prover는 사용하고자 하는 page에서 사용하면 됩니다.
다만 전역적으로 사용할 때 layout 파일에서 정의하면 use client 를 사용해야 하기 떄문에 별도의 컼포넌트를 만들어서 사용하는 것이 좋습니다.


Context API의 특징
전역 상태 관리: React 컴포넌트 트리에서 데이터를 전역적으로 공유할 수 있도록 돕는 내장 API.
Prop Drilling 방지: 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달하기 위해 여러 단계의 Prop을 전달할 필요 없음.
간단한 설정: 외부 라이브러리 없이 간단히 Provider와 Consumer를 사용해 구현 가능.

장점
가벼움: Redux나 MobX 같은 외부 상태 관리 라이브러리 없이도 전역 상태 관리를 쉽게 구현 가능.
유연성: 컴포넌트 구조에 맞게 자유롭게 설계할 수 있어 다양한 구조에 적합.
React와의 완벽한 통합: React의 내장 기능이므로 추가적인 학습이나 설정이 필요 없음.

Redux의 특징
중앙 집중식 상태 관리: 애플리케이션 전체 상태를 하나의 스토어(Store)에서 관리.
단방향 데이터 흐름: 액션(Action) → 리듀서(Reducer) → 상태(State)로 이어지는 예측 가능한 흐름.
미들웨어 지원: Redux Thunk, Redux Saga 등으로 비동기 로직을 효과적으로 처리 가능.

장점
예측 가능성: 상태의 변경이 일관된 방식으로 처리되기 때문에 디버깅과 유지보수가 쉬움.
확장성: 대규모 애플리케이션에서도 안정적으로 작동하며, 커뮤니티 생태계가 풍부함.
시간 여행 디버깅: Redux DevTools를 통해 상태 변화를 시간순으로 추적 가능.


## 11월 13일 수업내용
### UI 전략

### Chakra UI
오픈소스 컴포넌트 라이브러리로 모듈화 되어있고 접근성이 뛰어나며 보기 좋은 UI를 만들 수있습니다.
버튼 모달 입력 등 다양한 내장 컴포넌트를 제공합니다
dark mode 및 light mode를 모두 지원합니다
chakra UI의 useColorMode 훅을 사용해서 현재 사용하는 컬러 모드를 확인할 수 있습니다.
기본 컴포넌트를 조합해서 새로운 컴포넌트를 쉽게 만들 수있습니다.
타입스크립트로 작성되어 있으며 개발자에게 최고의 개발 경험을 제공합니다.

### Tawilwind CSS
Tailwind CSS는 미리 정의된 유틸리티 클래스를 제공하여 CSS를 작성하는 대신 HTML 요소에 클래스를 직접 추가해 빠르고 간결하게 스타일을 적용할 수 있습니다.
tailwind.config.js 파일을 사용하여 테마, 색상, 브레이크포인트 등을 사용자 정의할 수 있어 프로젝트에 맞는 디자인 시스템을 쉽게 구축할 수 있습니다.
Tailwind는 sm, md, lg와 같은 반응형 브레이크포인트를 제공하여 화면 크기에 따라 스타일을 유연하게 조정할 수 있습니다.
유틸리티 클래스 중심의 접근 방식은 중복 스타일을 줄이고, 컴포넌트와 스타일 간의 높은 응집력을 제공해 유지보수를 쉽게 만듭니다.
빌드 시점에 사용하지 안흔ㄴ 클래스는 제거 되기 떄문에 높은 수준의 최적화를 지원합니다.

### Headless UI
컴포넌트의 HTML 구조와 스타일을 직접 제어할 수 있어, 디자인 시스템이나 Tailwind CSS와 같은 유틸리티와 결합해 일관된 사용자 경험을 구축할 수 있습니다.
Headless UI의 모든 컴포넌트는 WAI-ARIA 표준을 따르며, 스크린 리더나 키보드 사용자에게도 최적화된 접근성을 제공합니다.
상태 기반 UI(예: 열림/닫힘 상태, 선택된 항목 등)를 쉽게 처리할 수 있는 고수준 API를 제공해 복잡한 상태 관리를 간소화합니다.
React와 Vue를 지원하며, JavaScript 생태계 내에서 다양한 라이브러리와 쉽게 통합할 수 있는 유연한 설계로 다양한 프로젝트에 활용 가능합니다.

### Chakra, TailWind, Headless 공식문서의 예제 따라해보기

### 프로젝트 생성법

### Chakra UI
### Tailwind CSS
### Headless UI

### 프로젝트 생성 
Next 14버전을 사용 마찬가질 기말고사도 14버전
Tailwind 사용을 위해 프로젝트를 다시 생성
15버전이 있으나 호환이 안정적이지 않음
프로젝트 이름을 자요로 하고 나머지 모드는 모드 YES

## 11월 6일 수업내용
### Styled JSX
* Styled JSX는 CSS-in-JS 라이브러리 입니다. 내장 모듈이기 떄문에 설치가 필요 없습니다.
* 즉 CSS 속성 지정을 위해 자바스크립트를 사용할 수 있는 라이브러리 입니다.
* 다음 코드는 간단한 예입니다.
* ```javascript
   export default function Button(props){
   return (
   <>
   <button className="button">{props.children}</button>
  <style jsx>{
   .button{'
  padding : 1em;
  border-raduis L 1em;
  border: none;
  background:green;
  color : white;
  '}</style>
  }
  </>
  )
  }
  ```
* 클라이언트에서 리액트 하이드레이션이 끝나면 CSS를 다시 생성해야 합니다.
* IDE나 코드 편집기 등 개발 도구에 대한 지원이 부족합니다.
* 문법 하이라이팀 자동 완성 린트 기능을 제공하지 않습니다
* 코드 내에서 CSS에 대한 읮존성이 점점 커지기 때문에 웹번들도 커지고 느려집니다.
* 서버에 미리 CSS를 생성해도 클라이언트에서 리액트 하이드레이션이 끝나면 CSS를 다시 생성해야 합니다.

## Class
* 클래스들은 컴포넌트 스코프를 가집니다.
* 생성된 HTML 페이지 소스를 보면 class이름이 바뀌어 있는 것을 확인할 수 있습니다.
* Styled JSX때와 마찬가지로 이전 고유한 이름 때문에 다른 파일이라면 같은 class명을 사용해도 충돌이 일어나지 않습니다.
* 만일 전역 CSS를 선언하고 싶다면 styles/les/globals.css를 만들고 사용합니다.
* 파일명은 반드시 globlas가 아니어도 되지만 암묵적으로 합의는 가능하면 지키는 것이 좋습니다.
* ```javascript
   html, body{
   padding : 0;
  margin: 0;
  font-family: sans-serif;
  }
  ```
* 이제 ...app.js에 import 해주면 모든 컴포넌트에 적용됩니다.
* 또 한가지 방법은 class로 선언된 요소에 ;globla 키워드를 추가해 줍니다. .button:global{}

## 10월 30일 수업내용
### 데이터 불러오기
* Next는 클라이언트와 서버 모두에서 데이터를 불러올 수 있습니다.
* 서버는 다음 두 가지 상황에서 데이터를 불러올 수 있습니다.
   1. 정적 페이지를 만들 떄 ```getStaticProps``` 함수를 사용해서 빌드 시점에 데이터를 불러올 수 있습니다.
   2. 서버가 페이지를 렌더링할 때 ```getServerSideProps```를 통해 실행 도중 데이터를 불러올 수도 있습니다.
* 데이터베이스에서 데이터를 가져올 수도 있지만 안전하지 않기 때문에 권장하지 않습니다.
* 데이터베이스와 접근은 백엔드에서 처리한느것이 좋습니다.
* Next는 프론트엔드만 담당하는것이 좋습니다.

### 서버 데이터 불러오기
* Node의 내장 HTTP 라이브러리를 사용할 수 있습니다.
  1. 다만 서드파티 HTTP 클라이언트와 비교했을 때 설정하고 처리해야 할 작업이 더 많은 편입니다.
* HTTP 클라이언트 라이브러리를 사요할 수 있습니다. 가장 유명한 것이 Axios입니다.
* ```Axios```를 사용하는 이유
  1. 클라이언트와 서버 모두 동일하게 적용할 수 있습니다.
  2. API를 원활하게 불러올 수 있습니다.
 
### REST API
* REST API란 CRUD..
* CRUD란..
* REST API란 REST의 규칙을 적용한 API를 의미합니다.
* API 설계 규칙

### JSON SERVER
* Backend가 개발되기 전이나, 아직 외부 API가 결정되지 않았다면 local에 JSON Server를 구축하고 Frontend 개발을 기에 적합한 node 패키지입니다.
* 다음 명령으로 json-server를 구축합니다
* ```
  npm -g json-server
  ```

### Axios란
* 특징, 장단점

* Fetch API란
* 특징, 장단점

### Axios 사용하기

### 개선할 사항
* rest-api의 page.jsx useState사용하여 개선하기

## 10월 23일 수업내용
1. Static Resource
   * 정적 자원 중 이미지 파일은 SEO에 많은 영향을 미칩니다.
   * 다운로드 시간이 많이 걸리고 렌더링 후에 레이아웃이 변경되는 등 UX에 영향을 미칩니다
   * 이것을 누적 레이아웃 이동(CLS)라고 합니다.
   * Image 컴포넌트를 사용하면 CLS문제를 해결합니다.
   * ```lazy loading``` 이미지 로드 시점을 필요할 때 까지 지연시키는 기술입니다.
   * 이미지 사이즈 최적화로 사이즈를 10/10이하로 줄여 줍니다.
   * PlaceHolder를 제공합니다.

2. Image Component
   * WebP와 같은 최신 이미지 포맷 및 최신 포맷을 지원하지 않는 브라우저를 위해 png나 jpge와 같은 예전 이미지 포맷도 제공합니다.
   * Image 컴포넌트를 사용하면 다양한 ```props```를 전달할 수 있습니다.
   * ``` Props src = " ", width = {500}, height = {500}, alt =" ", Placeholder = "blue", loading = "lazy" ```
   * 정적 자원은 기본적으로 ```public``` 디렉토리에 저장합니다.
   * 정적 자원은 번들링 이후에도 변하지 않기 때문입니다.
   * 여러 종류의 정적 자원을 사용할 경우 ```public```의 ```root```에 각각 디렉토리를 만들어 사용합니다.
   * Image도 마찬 가지로 ```.public/images``` 디렉토리를 만들고 사용합니다.
   * 이미지를 불러오는 방법은 직접 불러오는 방법과 import하는 방법 2가지가 있습니다.
   * 이미지의 경로 /images/이미지이름.확장자 로 합니다 이 떄 public은 생략합니다.
   ```JavaScript
    import Image from "next/image";
    import foo from "/public/images/test1.png";
    
    export default function About() {
      return (
        <>
          <h1>About</h1>
          <h3>About...</h3>
          <Image
            src="/images/test2.png"
            alt="lighthouse"
            width={300}
            height={200}
          ></Image>
    
          <Image src={foo} alt="lighthouse" width={300} height={200}></Image>
        </>
      );
    }

   ```

   1. Image Component - Remote
      * ```Pixabay```와 같은 외부 이미지를 사용하려면 ```testconfig.mjs```에 URL을 추가해줘야 합니다.
      * 만일 파일이 없다면 Project root에 추가해 주면 됩니다.
      * 파일의 초기 상태는 다음과 같습니다.
      * ```contextConfig```에 images를 추가하합니다.
      * 간단하게 domains만 등록해줘도 됩니다.
     
    ```JavaScript
      /** @type {import('next').NextConfig} */
    const nextConfig = {
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "cdn.pixabay.com",
          },
        ],
      },
    };
    
    export default nextConfig;

    ```

3. 컴포넌트 구성
   * 컴포넌트는 세 가지로 분류하고 각 컴포넌트와 관련된 스타일 및 테스트 파일을 같은 곳에 두어야 합니다.
   * 코드를 더 효울적으로 구성하기 위해 아토믹 디자인 원칙에 따라 디렉토리를 구성합니다.
   * atoms : 가장 기본적인 컴포넌트 관리 예 : button, input, p 와 같은 표준 HTML요소를 감싸는 용도로 사용되는 컴포넌트
   * molecules : atom에 속한 컴포넌트 여러 개를 조합하여 복잡한 구조로 만든 컴포넌트 관리 예: ```input```과 ```label```을 합쳐서 만든 새로운 컴포넌트
   * organisms : molecules와 atoms를 섞어서 더 복잡하게 만든 컴포넌트 관리 예 : footer나 carousel 컴포넌트
   * templates : 위의 모든 컴포넌트를 어떻게 배치할지 결정해서 사용자가 접근할 수 있는 페이지
   * button 컴포넌트를 예를 들면 다음과 같이 최소환 세 개의 파일을 만들어야 합니다.
   *  컴포넌트 파일, 스타일 파일, 테스트 파일입니다.
   *  이렇게 컴포넌트를 구성하면 필요할 떄 컴포넌트를 찾고 수정하기 쉽습니다.
   ```
   *  mkdir components/atoms/button
   *  cd components/atoms/button
   *  touch index.js
   *  touch button.test.js
   *  touch button.styled.js
   ```
4. 스타일 파일 구성
   * 스타일 파일은 앱에서 어떤 스타일 관련 기술을 사용하는가에 따라 구성 달라집니다.,
   * ```Emotion```, ```styled-components```, JSS와 같은 CSS-in-JS 프레임워크의 경우 컴포넡트 별로 스타일 파일을 만듭니다. 이렇게 하면 스타일 변경도 쉽습니다.
   * 만일 컬러 팔레트, 테마, 미디어 쿼리와 같은 공통 스타일의 경우는 ```styles/``` 디렉토리를 사용합니다.  
   4-1 lib 파일 수성
     * lib파일은 서드파티 라이브러리를 감싸는 스크립트를 말합니다.
     * lib파일은 특정 라이브러리에 특화된 것 입니다. 예 : GraphQL
     * 만일 ```GraphQL```을 사용한다면 클라이언트를 초기화 하고 질의문과 뮤테이션을 저장하는 등의 작업이 필요합니다.
     * 먼저 이런 스크립트를 좀 더 모듈화하기 위해 프로젝트 root에 lib/graphql/  디렉토리를 만듭니다.
5. 데이터 불러오기
   * Next는 클라이언트와 서버 모두에서 데이터를 불러올 수 있습니다.
   * 서버는 다음 두 가지 상황에서 데이터를 불러올 수 있습니다.
   * 정적 페이지를 만들 때 ```getStaticProps```함수를 사용해서 빌드 시점에 데이터를 불러올 수 있습니다.
   * 서버가 페이지를 렌더링할 때 ```getServerSideProps```를 통해 실행 도중 데이터를 불러올 수도 있습니다.
   * 데이터베이스에서 데이터를 가져 올 수도 있지만 안전하지 않기 때문에 권장하지 않습니다. 데이터베이스의 접근은 백엔드에서 처리하는 것이 좋습니다.
   * Next는 프론트엔드만 담당하는 것이 좋습니다.
    


## 9월 11일 수업내용
### ECMAScript 기능 중 파이프라인 연산자를 사용해보자
```JavaScript
console.log(Math.random() * 10);
// 파이프라인 연산자를 사용하면 위 코드를 아래와 같이 바꿀 수 있다.
Math.random()
  |> (_ => _ * 10)
  |> console.log;

```

### 1. Bootstrap

* ```Bootstrap```은 웹 개발에서 많이 사용되는 오픈 소스 프레임워크로,  
```CSS```와 ```JavaScript```를 사용하여 반응형 웹 디자인을 쉽게 구현할 수 있습니다.  
트위터에서 개발한 이 프레임워크는 여러 가지 기본 스타일과 구성 요소를 포함하고 있어 신속하게 웹 페이지를 개발할 수 있게 합니다.  

- **특징**
  - 그리드 시스템을 이용해 반응형 디자인을 손쉽게 구현
  - 버튼, 네비게이션 바, 모달 등 다양한 UI 컴포넌트 제공
  - 미리 정의된 스타일 클래스를 통해 일관된 디자인 적용 가능
  - 다양한 ```JavaScript``` 플러그인을 통해 기능적인 요소를 쉽게 추가 가능

- **사용 방법**
  1. CDN을 통해 ```Bootstrap```을 ```HTML```에 직접 포함
  2. ```Bootstrap``` 패키지를 설치해 프로젝트 내에서 직접 사용

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <button class="btn btn-primary">Bootstrap Button</button>
</body>
</html>
```

## 2. SCSS

SCSS는 SASS(Syntactically Awesome Style Sheets)의 문법 중 하나로, CSS와 유사한 구문을 사용하여 더 쉽게 작성할 수 있는 스타일 시트 언어입니다. SCSS는 CSS의 단점을 보완하기 위해 변수, 중첩(Nesting), 모듈화 등을 지원하여 스타일 코드를 보다 체계적이고 간결하게 작성할 수 있습니다.

- **특징**
  - CSS와 거의 동일한 문법을 사용하여 배우기 쉬움
  - 변수, 중첩, 믹스인, 상속 등의 기능을 통해 코드 재사용성과 유지보수성을 높임
  - CSS와의 높은 호환성으로, 기존 CSS 코드를 그대로 사용할 수 있음

- **사용 방법**
  1. `.scss` 파일로 스타일 작성
  2. 컴파일러(SASS 컴파일러)로 CSS로 변환 후 사용

```scss
$primary-color: #3498db;

.button {
  background-color: $primary-color;
  &:hover {
    background-color: darken($primary-color, 10%);
  }
}
```

## 3. SASS

SASS는 스타일 시트 언어로, CSS에 비해 강력한 기능을 제공하며, CSS의 단점을 보완해 코드의 구조화와 모듈화를 쉽게 해줍니다. SCSS와 달리 줄임 문법을 사용하며, 중괄호와 세미콜론을 사용하지 않아 간결하게 작성할 수 있습니다.

- **특징**
  - SCSS와 같은 기능을 제공하지만, 문법이 더욱 간결함
  - CSS와 비교해 높은 코드 재사용성과 유지보수성 제공
  - 변수, 믹스인, 상속 등의 기능을 제공하여 스타일 코드의 복잡도를 줄임

- **사용 방법**
  1. `.sass` 파일로 스타일 작성
  2. 컴파일러를 사용해 CSS 파일로 변환 후 사용

```sass
$primary-color: #3498db

.button
  background-color: $primary-color
  &:hover
    background-color: darken($primary-color, 10%)
```

### 1. 몇 가지 일어날 수 있는 오류
* 처음 Next 프로젝트를 생성할 때 오류로 생성되지 않는 경우가 있다.
* 이 것은 CRA가 설치되지 않아서 생기는 현성
* 이런 경유는 다음과 같이 ```create-reacpt-app```을 Global로 설치해 주면 됩니다.
* ```npm i -g create-react-app```
* 이제 프로젝트를 생성합니다.
* Next.js 12 이후 ```babel```을 지원이 중지 되었습니다. 이제 SWC로 그 기능이 대체 되었다.
* 따라서 최신 환경에서 ```babel```설정을 하게 되면 오류가 발생한다.
* 당연히 ```babel```을 제거하면 오류는 사라진다.
* 만일 SWC를 사용하고 싶다면 다음과 같이 12 혹은 최신 버전의 Next프로젝트를 생성해주면 자동으로 설정된다.  

### 2. Transpile은 어떻게 동작하나
* ```Babel```은 ```ECMAScript```와 같은 자바스크립트 최신 버전이나 ```TypeScript```를 이전 버전의 코드로 변환시켜주는 ```Transpile``` 도구다.  
* ```개발자가 작성한 코드 -> Parse -> Transform > Generate -> 이전 버전의 코드  ```
* ```Babel```의 ```parser```는 자바스크립트를 컴퓨터가 이해할 수 있는 코드 구조인 ```Abstarct Syntax Tree```로 변환해 주는 역할을 수행한다.  
* ```Babel```의 ```traverse```모듈은 전체 트리 상태를 유지하며 노드 교체 제거 추가를 담당합니다.  
* 마지막 ```generator```가 수정된 AST를 일반 코드로 변환해 주게 됩니다.    

* SWC도 ```Babel```과 같은 자바스크립트 트랜스 컴파일러 입니다.  
* Next12 이후부터 ```Babel```에서 SWC로 교체되었습니다  
* SWC는 ```Rust```로 작성되어 속도가 훨씬 빠릅니다.  

### 3. 왜 SWC를 사용해야 하는가
* Babel의 단점  
* Babel로 변환된 코드를 이해하기 어렵다.  
* 원 코드에 비해 변환 코드의 길이가 늘어난다  
* 변환에 시간이 많이 걸린다.  

SWC의 장점  
* 확장성: 개발자들은 라이브러리를 fork 해올 필요 없이 Next JS에 미리 설치된 SWC를 사용할 수 있다.  
* WebAssembly: Rust의 WASM(WebAssembly) 지원으로 어떤 종류의 플랫폼에서도 Next JS 개발을 할 수 있다.  
* 성능: 다른 컴파일러들보다 훨씬 좋은 성능을 제공한다.  
* 커뮤니티 지원: 빠르게 성장하는 커뮤니티를 가지고 있다.  

### 4. 렌더링 전략
* 렌더링 전략이란 웹페이지 또는 웹애플리케이션을 웹 브라우저에 재공하는 방법을 의미합니다.
* 정적인 페이지 제작하는 Gatsby를 추천합니다.  
* 그런데 Next.js에서는 이 모든 방법을 완전히 새로운 수준으로 제공합니다.
* 어떤 페이지는 빌드 시점에 정적으로 생성하고, 어떤 페이지는 실행 시점에 동적으로 생성할지 쉽게 정할 수 있습니다.
* 또한 특정 페이지에 대한 요청이 있을 때 마다 페이지를 다시 생성할 수도 있습니다.
* 그리고 반드시 클라이언트에서 렌더링해야 할 컴포넌트도 지정할 수 있어서 개발이 쉽습니다.  

### 5. 서버 사이드 렌더링
* APM을 이용하는 일반적인 웹 페이지 생성이라고 보면 됩니다.
* 여기에 자바스크립트 코드가 적재되면 동적으로 페이지 내용을 렌더링합니다.  

* Next.js도 이와 같이 동적으로 페이지를 렌더링할 수 있습니다.
* 그리고 여기에 스크립트 코드를 집어 넣어서 나중에 웹페이지를 동적으로 처리할 수도 있는데 이를 하이드레이션이라고 합니다.  

* 예를 들면 어떤 사입이 작성한 블로그 글을 한 페이지에 모아서 작성해야 한다면 SSR을 이용하는 것이 적당합니다.
* 서버 사이드 렌더링 -> 자바스크립트가 하이드레이션된 페이지를 전송 -> 클라이언트에서 DOM위에 각 스크립트 코드를 하이드레이션 : 페이지 새로고침 없이 사용자와 웹 페이지간 상호 작용을 가능하게 한다.  

* SSR의 장점
   * 첫 페이지 로딩 속도가 클라이언트 사이드 렌더링에 비해 더 빠릅니다.
   * 해당 첫 페이지에 해당하는 문서만 브라우저에게 전달하여 브라우저가 렌더링하기 때문에 초기 로딩 속도가 클라이언트 사이드 렌더링에 비해 더 빠릅니다.
   * 검색엔진최적화(SEO)가 가능합니다.

### 6. Next.js 13 vs 14 차이점
* 앱 디렉토리 구조
   * Next.js 13: pages 디렉토리 기반의 라우팅 시스템을 사용하며, 파일 기반 라우팅을 제공합니다.
   * Next.js 14: 새로운 app 디렉토리 기반의 라우팅 시스템 도입. 더 강력한 라우팅 및 레이아웃 구성 기능을 지원하며, 더 세밀한 페이지 구성과 데이터 페칭 기능을 제공.
* 서버 컴포넌트
   * Next.js 13: 서버 컴포넌트 기능이 소개되었지만, 완전한 안정성을 보장하지는 않음.
   * Next.js 14: 서버 컴포넌트가 더 발전하고 안정화됨. 더 많은 기능과 성능 개선이 포함되어 서버 사이드 렌더링(SSR) 및 정적 사이트 생성(SSG) 시 더욱 효과적임.
* 데이터 페칭
   * Next.js 13: getServerSideProps, getStaticProps와 같은 전통적인 데이터 페칭 방법 사용.
   * Next.js 14: 새로운 fetch API와 async/await 문법을 통한 데이터 페칭 방식이 도입됨. 데이터 페칭과 렌더링의 유연성이 향상됨.
* TypeScript 지원
   * Next.js 13: TypeScript 지원은 기본적이며, 일부 기능에 제한이 있을 수 있음.
   * Next.js 14: TypeScript의 지원이 강화되어, 타입 안정성을 높이고 더 나은 개발 경험을 제공.

### 7. CSR을 사용할 때의 주요 이점
1. 네이티브 앱처럼 느껴지는 웹 앱
   * 전체 자바스크립트 번들을 다운로드 한다는 것은 렌더링할 모든 페이지가 이미 브라우저에 다운로드 되어 있다는 뜻입니다.
   * 다른 페이지로 이동해도 서버에 요청할필요 없이 바로 페이지를 이동할 수 있습니다.
   * 페이지를 바꾸기 위해 새로 고칠 필요가 없습니다.

2. 쉬운 페이지 전환
   * 클라이언트에서의 내비게이션은 브라우저 화면을 새로 고칠 필요 없이 다른 페이지로의 이동을 가능하게 만듭니다.
   * 페이지 간 전환에 멋진 효과를 넣을 수도 있습니다.

3. 지연된 로딩과 성능
   * 웹 앱은 최소로 필요한 HTML만 렌더링합니다.
   * 버튼을 누르면 나오는 모달도 실제 버튼이 눌렸을 때 동적으로 생성하게 됩니다.

4. 서버 부하 감소
* 서버리스 환경에서 웹 앱을 제공할 수도 있습니다.

### 8. process.browser 변수
* 서비스 중단됨 대신 좀 더 정확한 의미를 갖는 typeof window를 사용할 수 있음
* typeof widnow를 서버에서 실행하면 그 값은 문자열 "undefined가 되며 그렇지 않으면 클라이언트에서 실행하게 됩니다.

### 9. 정적 사이트 생성 SSG : Static Site Generation
* SSG는 일부 또는 전체 페이지를 빌드 시점에 미리 렌더링 합니다.
* SSG는 SSR 및 CSR과 비교했을 때 다음과 같은 장점이 있습니다.
   1. 쉬운 확장
      * 정적 페이지는 단순 HTML 파일이므로 CDN을 통해 파일을 제공하거나 캐시에 저장하기 쉽습니다.
   2. 뛰어난 성능
      * 빌드 시점에 HTML 페이지를 미리 렌더링하기 때문에 페이지를 요청해도 클라이언트나 서버가 무언가를 처리할 필요가 없습니다.
   3. 더 안전한 API 요청
      * 외부API를 호출하거나 데이터베이스에 접근하거나 보호해야 할 데이터에 접근할 일이 없습니다.
      * 필요한 모든 정보가 빌드 시점에 미리 페이지로 렌더링 되어 있기 떄문입니다.

* SSG는 높은 확장성과 뛰어난 성능을 보이는 프론트엔드 애플리케이션을 만들고 싶을 때 가장 좋은 방법입니다.  
* 한가지 문제점은 일단 웹페이지를 만들고 나면 다음 배포 전까지 내용이 변하지 않는다는 것입니다.
* 조금이라도 수정하려면 필요한 데이터를 가져와서 수정하고 다시 생성하는 과정을 반복해야 합니다.
* 이런 문제 때문에 나온 방법이 바로 증분 정적 재생성입니다.
* 예를 들어 동적 컨텐츠를 제공하지만 해당 콘텐츠 데이터를 로딩하는데 시간이 오래 걸린다면 SSG와 ISR을 함께 사용하여 문제를 해결할 수 있습니다.
* 많은 양의 데이터를 필요로하는 복잡한 대시보드를 만든다면 데이터를 불러 오기 위한 REST API 호출에 수 초가 소요됩니다.
* 만일 데이터가 자주 변하지 안흔ㄴ다면 SSG와 ISR을 사용해서 데이터를 10분동안 캐싱할 수 있습니다.


## 9월 4일 수업내용
### 1. app-route, page-route 차이


* 기본적으로 Nextjs프로젝트를 생성하는 방법은 다음과 같다
```
npx create-next-app@latest
```
* npm을 기본으로 사용하고 싶다면 다음 명령으로 설정을 덮어줄 수 있다.
```
npx create-next-app <app-name> -use-npm
```
* 또 다른 프로젝트 생성 방법으로는 github 저장소에서 원하는 보일러플레이트 코드를 다운로드해서 새 Next.js 프로젝트를 시작할 수도 있다.
```
npx create-next-app--example <보일러플레이트 이름>
npx create-next-app--example blog-starter
```
* approtue about폴더 생성 후 page.js를 생성해야 라우팅됨

### 2. 프로젝트의 기본 구조
* pages/ 디렉토리 안의 모든 js파일은 public 페이지가 됩니다.  

* pages/의 index.js파일을 복사해서, about.js로 이름을 바꾸면 locaghost:3000/about으로 접속할 수 있다.  

* public/ 디렉토리에는 웹 사이트의 모든 퍼블릭 페이지의 정적 콘텐츠가 있다.  

* 이미지, 컴파일된 css, 컴파일된 js, 폰트 등 용도가 정해져 있는 디렉토리는 pages/ 와 public/ 뿐이다.

### 3. Next.js 14의 프로젝트의 기본 구조
* 프로젝트를 생성할 때 /src를 사용 여부를 선택할 수 있고, 일반적으로 사용한다.  

* 14에서는 /public과 /src/app 디렉토리만 용도가 정해져 있다.

### 4. 타입스크립트 지원
* Next.js는 타입스크립트로 작성되었기 떄문에 고품질의 type definition을 지원한다.  

* 기본 언어를 타입스크립트로 지정하려면 root에 tsconfig.json이라는 설정파일을 생성하면 된다.  

* 그런 다음 npm run dev 명령을 실행하면 다음과 같은 메세지를 확인할 수 있다.  

* 이 메시지는 주 언어에 대한 의존성 패키지를 설치해달라는 내용이다.  

* 패키지를 설치하고 나면 비어 있던 tsconfig.json파일의 내용이 자동으로 채워진다.

### 5. 웹팩과 바벨 설정 커스터마이징
* 바벨이나 웹팩의 설정도 커스터마이징 할 수 있다.  

* 바벨은 자바스크립트 트랜스컴파일러이며 최신 자바스크립트 코드를 하위 호환성을 보장하는 스크립트 코드로 변환하는 일을 담당한다.  

* 하위 호환성이 보장되면 어떤 웹 브라우저에서든 자바스크립트 코드를 실행할 수 있다.  

* 바벨을 사용하면 브라우저나 Nodejs 등에서 지원하지 않는 세톱과 훌륭한 기능을 현재의 환경에서도 실행할 수 있습니다.  

* Nodejs에서 실행하면 오류가 나지만 바벨과 사용하면 실행가능한 ECMAScript코드로 바꿔줄 수 있는 예를 확인할 수 있다.  

* 바벨 설정을 커스터마이징 하려면 프로젝트 Root에 .bablerc 라는 파일을 생성하면 된다.  

* 이 설정 파일을 비워두면 오류가 발생하기 때문에 최고한 다음의 내용을 저장해야 한다.
```JavaScript
{
  "presets" : ["next/bable"]
}
```

### 6. ECMAScript 기능 중 파이프라인 연산자를 사용해보자
* 파이프라인은 공식적으로 체택되지 않은 연산자  

* 기능을 사용하려면 바벨플러그인을 설치해야함  

* 그리고 .bablerc파일을 다음과같이 수정  


## 8월 28일 수업내용

### 1. 코드 분할
* Next.js는 코드 분할을 자동으로 수행함   

* 각 페이지는 해당 페이지에 필요한 부분만 로드함  

* 홈페이지가 렌더링될 때 다른 페이지의 코드는 처음에 제공되지 않음

### 2. 서버 사이드 렌더링
* 일반적으로 클라이언트 사이드에서 동작하는 싱글 페이지 앱(SPA)을 서버에서 렌더링한 다음 완전히 렌더링된 페이지를 클라이언트로 보내는 인기있는 기술

### 3. 정적사이트 생성
* 빌드 타임에 HTML 페이지를 미리 생성하여 빠른 로딩 속도와 SEO 최적화를 제공

### 4. 증분 정적 컨텐츠 생성
* Next.js의 핵심 기능 중 하나로, 정적 사이트 생성(Static Site Generation, SSG)과 서버사이드 렌더링(Server-Side Rendering, SSR)을 결합하는 혁신적인 방법  

* 웹 사이트의 일부 페이지를 정적으로 생성하면서 해당 페이지의 콘텐츠를 동적으로 업데이트할 수 있는 기능입니다. 이것은 정적 사이트 생성과 서버사이드 렌더링의 장점을 결합한 하이브리드 방식

### 5. Next.js란
* Next.js는 풀스택 웹 애플리케이션을 구축하기 위한 React 프레임워크입니다. 현대적인 웹 애플리케이션 개발 과정을 간소화하는데 사용된다.  

* Vercel1에서 개발된 Next.js는 서버 사이드 렌더링, 정적 사이트 생성, API 개발에 대한 쉬운 솔루션을 제공하는 데 중점을 둔다.  

* React의 강력함과 유연성을 더해 고급 성능 최적화와 내장된 개발 기능을 제공함으로써, Next.js는 개발자들이 쉽게 빠르고 확장 가능하며 SEO 친화적인 웹 애플리케이션을 구축할 수 있도록 지원한다.

### 6. Next.js 장점
* Next.js는 React의 강력하고 유연한 프레임워크로, 성능, SEO, 개발자 경험을 위한 고급 기능과 최적화를 제공한다.  

* 서버 사이드 렌더링, 정적 사이트 생성, 통합된 API 개발의 지원을 통해 Next.js는 다양한 웹 개발 요구 사항에 포괄적인 솔루션을 제공한다.

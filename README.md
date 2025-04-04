## 🚀 프로젝트 소개

감성과 기능, 둘 다 포기하지 않은  
**드래그 앤 드롭 기반의 칸반 보드 프로젝트**입니다.

- 💡 직관적인 UI / UX
- 🎨 감성 styled-components 테마 적용
- 💾 Recoil 상태관리 + LocalStorage 저장
- 🧠 Board / Card 이동 완벽 구현
- 🧹 Drag Type 분리 (BOARD vs CARD)

---

## 🧰 사용 기술

- **React + TypeScript**
- **Recoil**
- **react-beautiful-dnd**
- **styled-components**
- **SweetAlert2**
- **Lucide Icons**

---

## 📦 주요 기능

| 기능 | 설명 |
|------|------|
| 📋 보드 추가 / 수정 / 삭제 | 보드 이름 편집, 삭제 시 모든 카드도 제거 |
| 🗂️ 카드 추가 / 수정 / 삭제 | 카드마다 고유 ID, 편집/삭제 기능 |
| 🔀 드래그 앤 드롭 | 보드 간 이동, 카드 간 이동, 드래그 타입 분리 |
| 🗑️ 카드 삭제 영역 | 드래그하여 휴지통 영역으로 이동 시 삭제 |
| 🌗 다크모드, 라이트모드 테마 | 로컬스토리지 연동된 테마 스위치 |

---

## 🧠 상태 관리 구조
📦 Recoil 
┣ 📄 ToDoAtom // 전체 보드 + 카드 상태 
┗ 📄 DragAtom // 드래그 상태 추적용 (카드만 드래그 구분)
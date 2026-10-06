import { shortcuts } from "./homeContent";
import * as S from "./Home.styled";

export default function CategoryShortcuts() {
  return <S.ShortcutGrid aria-label="상품 카테고리 바로가기">
    {shortcuts.map((shortcut) => <S.ShortcutLink key={shortcut.id} to={shortcut.to}>
      <S.ShortcutImage aria-hidden="true" style={{ backgroundPosition: shortcut.imagePosition }} />
      <span>{shortcut.label}</span>
    </S.ShortcutLink>)}
  </S.ShortcutGrid>;
}

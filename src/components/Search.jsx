export const Search = function (props) {
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Country"
          value={props.searchValue}
          onChange={(event) => props.setSearchValue(event.target.value)}
          onKeyDown={props.onKeyDown}
        />
      </form>
    </div>
  );
};

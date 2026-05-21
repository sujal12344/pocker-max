import styled from "styled-components";

const TableWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background: #f5f5f5;
    border-bottom: 2px solid #ddd;
  }

  th {
    padding: 0.75rem;
    text-align: left;
    font-weight: 600;
    font-size: 0.875rem;
    text-transform: uppercase;
    color: #666;
  }

  td {
    padding: 0.75rem;
    border-bottom: 1px solid #eee;
    font-size: 0.9rem;
  }

  tr:hover {
    background: #f9f9f9;
  }

  @media screen and (max-width: 624px) {
    font-size: 0.8rem;

    th,
    td {
      padding: 0.5rem;
    }
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${(props) => {
    switch (props.status) {
      case "won":
        return "#4caf50";
      case "lost":
        return "#f44336";
      case "folded":
        return "#ff9800";
      default:
        return "#999";
    }
  }};
  color: white;
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  @media screen and (max-width: 624px) {
    gap: 0.5rem;
  }
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${(props) => (props.active ? "#333" : "#ddd")};
  background: ${(props) => (props.active ? "#333" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: #333;
    background: ${(props) => !props.active && "#f5f5f5"};
  }

  @media screen and (max-width: 624px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const SortButton = styled(FilterButton)`
  margin-left: auto;

  @media screen and (max-width: 624px) {
    margin-left: 0;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #999;
  font-size: 1rem;
`;

const GameHistory = ({
  games = [],
  isLoading,
  error,
  onFilterChange,
  currentFilter,
  onSortChange,
  currentSort,
}) => {
  if (isLoading) {
    return (
      <TableWrapper>
        <EmptyState>Loading game history...</EmptyState>
      </TableWrapper>
    );
  }

  if (error) {
    return (
      <TableWrapper>
        <EmptyState style={{ color: "#f44336" }}>
          ⚠️ Failed to load game history. {error}
        </EmptyState>
      </TableWrapper>
    );
  }

  if (games.length === 0) {
    return (
      <TableWrapper>
        <EmptyState>
          No games played yet. Start playing to see your game history!
        </EmptyState>
      </TableWrapper>
    );
  }

  const filters = [
    { id: "all", label: "All Games" },
    { id: "won", label: "Won" },
    { id: "lost", label: "Lost" },
  ];

  const sorts = [
    { id: "recent", label: "Recent First" },
    { id: "oldest", label: "Oldest First" },
  ];

  return (
    <TableWrapper>
      <FilterWrapper>
        {filters.map((filter) => (
          <FilterButton
            key={filter.id}
            active={currentFilter === filter.id}
            onClick={() => onFilterChange(filter.id)}
          >
            {filter.label}
          </FilterButton>
        ))}
        <SortButton
          active={false}
          onClick={() => {
            const nextSort = currentSort === "recent" ? "oldest" : "recent";
            onSortChange(nextSort);
          }}
        >
          {currentSort === "recent" ? "⬇ Recent" : "⬆ Oldest"}
        </SortButton>
      </FilterWrapper>

      <StyledTable>
        <thead>
          <tr>
            <th>Date</th>
            <th>Buy-in</th>
            <th>Cash Out</th>
            <th>Profit/Loss</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, idx) => (
            <tr key={idx}>
              <td>{game.date}</td>
              <td>${game.buyIn}</td>
              <td>${game.cashOut}</td>
              <td
                style={{
                  color:
                    game.profit > 0
                      ? "#4caf50"
                      : game.profit < 0
                      ? "#f44336"
                      : "#666",
                  fontWeight: 600,
                }}
              >
                {game.profit > 0 ? "+" : ""}
                {game.profit}
              </td>
              <td>
                <StatusBadge status={game.status}>{game.status}</StatusBadge>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default GameHistory;

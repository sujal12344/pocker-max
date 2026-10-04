import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/buttons/Button";
import { Form } from "../components/forms/Form";
import { FormGroup } from "../components/forms/FormGroup";
import { Input } from "../components/forms/Input";
import { Label } from "../components/forms/Label";
import Container from "../components/layout/Container";
import RelativeWrapper from "../components/layout/RelativeWrapper";
import GameHistory from "../components/stats/GameHistory";
import GameStatsCard from "../components/stats/GameStatsCard";
import Heading from "../components/typography/Heading";
import HeadingWithLogo from "../components/typography/HeadingWithLogo";
import globalContext from "../context/global/globalContext";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  margin-bottom: 2rem;

  ${FormGroup} > *~* {
    margin: 0.5rem 0;
  }

  @media screen and (max-width: 624px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 320px;

    ${FormGroup} > *~* {
      margin: 0.5rem 0;
    }
  }
`;

// const DangerButton = styled(Button)`
//   background-color: ${(props) => props.theme.colors.dangerColorLighter};
//   color: ${(props) => props.theme.colors.fontColorLight};

//   &:visited,
//   &:hover,
//   &:active,
//   &:focus {
//     background-color: ${(props) => props.theme.colors.dangerColor};
//     color: ${(props) => props.theme.colors.fontColorLight};
//   }
// `;

const SectionDivider = styled.hr`
  border: none;
  border-top: 2px solid #e0e0e0;
  margin: 3rem 0;
`;

const StatsSection = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1.5rem;
  margin: 2rem 0;

  @media screen and (max-width: 624px) {
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
`;

const SectionHeading = styled(Heading)`
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

// Mock function to generate sample game data
const generateMockGameData = () => {
  const games = [];

  for (let i = 0; i < 12; i++) {
    const buyIn = (Math.floor(Math.random() * 9) + 1) * 100;
    const profit = Math.floor((Math.random() - 0.4) * 500);

    games.push({
      date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
      buyIn,
      cashOut: buyIn + profit,
      profit,
      status: profit > 0 ? "won" : profit < 0 ? "lost" : "folded",
    });
  }

  return games;
};

// Calculate stats from games
const calculateStats = (games) => {
  if (games.length === 0) {
    return {
      totalGames: 0,
      totalWins: 0,
      winRate: "0%",
      totalProfit: 0,
      avgProfit: 0,
      winRateDelta: 0,
    };
  }

  const totalGames = games.length;
  const wins = games.filter((g) => g.status === "won").length;
  const winRate = ((wins / totalGames) * 100).toFixed(1);
  const totalProfit = games.reduce((sum, g) => sum + g.profit, 0);
  const avgProfit = (totalProfit / totalGames).toFixed(0);

  // Calculate win rate delta (comparing first half to second half)
  const halfPoint = Math.ceil(totalGames / 2);
  const recentGames = games.slice(0, halfPoint);
  const olderGames = games.slice(halfPoint);

  const recentWinRate =
    recentGames.length > 0
      ? (
          (recentGames.filter((g) => g.status === "won").length /
            recentGames.length) *
          100
        ).toFixed(1)
      : 0;

  const olderWinRate =
    olderGames.length > 0
      ? (
          (olderGames.filter((g) => g.status === "won").length /
            olderGames.length) *
          100
        ).toFixed(1)
      : 0;

  const winRateDelta = (recentWinRate - olderWinRate).toFixed(1);

  return {
    totalGames,
    totalWins: wins,
    winRate: `${winRate}%`,
    totalProfit,
    avgProfit,
    winRateDelta: parseFloat(winRateDelta),
  };
};

const Dashboard = () => {
  const { userName, email } = useContext(globalContext);
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredGames, setFilteredGames] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentSort, setCurrentSort] = useState("recent");

  // Simulate API call to fetch game history
  useEffect(() => {
    setIsLoading(true);

    // Simulating API delay
    const timer = setTimeout(() => {
      try {
        const mockData = generateMockGameData();
        setGames(mockData);
        setError(null);
      } catch (err) {
        setError("Unable to load game history. Please try again later.");
        setGames([]);
      }
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Apply filter and sort
  useEffect(() => {
    let filtered = games;

    if (currentFilter !== "all") {
      filtered = games.filter((g) => g.status === currentFilter);
    }

    if (currentSort === "oldest") {
      filtered = [...filtered].reverse();
    }

    setFilteredGames(filtered);
  }, [games, currentFilter, currentSort]);

  const stats = calculateStats(games);

  return (
    <RelativeWrapper>
      <Container
        fullHeight
        flexDirection="column"
        justifyContent="flex-start"
        contentCenteredMobile
        alignItems="center"
        padding="6rem 2rem 2rem 2rem"
      >
        <Form
          onSubmit={(e) => e.preventDefault()}
          style={{ width: "100%", maxWidth: "900px" }}
        >
          <HeadingWithLogo textCentered hideIconOnMobile={false}>
            Dashboard
          </HeadingWithLogo>

          {/* Profile Settings Section */}
          <Wrapper>
            <FormGroup>
              <Label>Nickname</Label>
              <Input value={userName} />
              <Button primary>Change Nickname</Button>
            </FormGroup>
            <FormGroup>
              <Label>E-mail</Label>
              <Input type="email" value={email} />
              <Button primary>Change E-mail</Button>
            </FormGroup>
            <FormGroup style={{ gridColumnStart: "1", gridColumnEnd: "3" }}>
              <Button primary>Reset Password</Button>
              <Button>Delete Account</Button>
            </FormGroup>
            <Button
              as={Link}
              to="/"
              secondary
              style={{ gridColumnStart: "1", gridColumnEnd: "3" }}
            >
              Back to Home
            </Button>
          </Wrapper>

          <SectionDivider />

          {/* Game Statistics Section */}
          <StatsSection>
            <SectionHeading>📊 Your Game Statistics</SectionHeading>

            {error ? (
              <div
                style={{
                  background: "#ffebee",
                  border: "1px solid #f44336",
                  borderRadius: "4px",
                  padding: "1rem",
                  color: "#c62828",
                  marginBottom: "1rem",
                }}
              >
                ⚠️ {error}
              </div>
            ) : null}

            <StatsGrid>
              <GameStatsCard
                label="Total Games"
                value={stats.totalGames}
                subValue={`${stats.totalWins} wins`}
              />
              <GameStatsCard
                label="Win Rate"
                value={stats.winRate}
                subValue={
                  stats.winRateDelta !== 0
                    ? `${stats.winRateDelta > 0 ? "📈" : "📉"} ${Math.abs(
                        stats.winRateDelta,
                      )}% vs older`
                    : "No change"
                }
                positive={stats.winRateDelta > 0}
                negative={stats.winRateDelta < 0}
              />
              <GameStatsCard
                label="Total Profit/Loss"
                value={`$${stats.totalProfit.toLocaleString()}`}
                subValue={`Avg: $${Math.abs(stats.avgProfit)} per game`}
                positive={stats.totalProfit > 0}
                negative={stats.totalProfit < 0}
              />
            </StatsGrid>

            <SectionHeading style={{ marginTop: "2.5rem" }}>
              🎮 Recent Games
            </SectionHeading>
            <GameHistory
              games={filteredGames}
              isLoading={isLoading}
              error={error}
              onFilterChange={setCurrentFilter}
              currentFilter={currentFilter}
              onSortChange={setCurrentSort}
              currentSort={currentSort}
            />
          </StatsSection>
        </Form>
      </Container>
    </RelativeWrapper>
  );
};

export default Dashboard;

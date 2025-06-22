import React from "react";
import styled from "styled-components";

// Colors
const colors = {
  primary: "#0f8abe",
  primaryLight: "#e6f4fa",
  primaryDark: "#0c6e95",
  white: "#ffffff",
  gray100: "#f8f9fa",
  gray200: "#e9ecef",
  gray600: "#6c757d",
  gray800: "#343a40",
  blue100: "#d1e7f7",
};

// Font family
const fontFamily = "Montserrat, sans-serif";

// Styled components
const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors.gray100};
  font-family: ${fontFamily};
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem;

  @media (min-width: 640px) {
    padding: 2rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem 2rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.blue100};
  padding: 0.75rem;
  border-radius: 9999px;
  margin-bottom: 1rem;

  @media (min-width: 640px) {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }

  svg {
    width: 36px;
    height: 36px;

    @media (min-width: 640px) {
      width: 48px;
      height: 48px;
    }
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.gray800};
  margin-bottom: 0.5rem;
  line-height: 1.3;

  @media (min-width: 640px) {
    font-size: 1.75rem;
  }

  @media (min-width: 768px) {
    font-size: 2rem;
  }

  @media (min-width: 1024px) {
    font-size: 2.25rem;
  }
`;

const Subtitle = styled.p`
  font-size: 0.9375rem;
  color: ${colors.gray600};
  max-width: 42rem;
  margin: 0 auto;
  line-height: 1.5;

  @media (min-width: 640px) {
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const MainCard = styled.div`
  background-color: ${colors.white};
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    border-radius: 1rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    margin-bottom: 3rem;
  }
`;

const HeroSection = styled.div`
  padding: 2rem 1rem;
  text-align: center;
  color: ${colors.white};
  background-color: ${colors.primary};

  @media (min-width: 640px) {
    padding: 2.5rem 1.5rem;
  }

  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }

  @media (min-width: 1024px) {
    padding: 4rem 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  line-height: 1.3;

  @media (min-width: 640px) {
    font-size: 1.375rem;
  }

  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.75rem;
  }
`;

const HeroText = styled.p`
  font-size: 0.9375rem;
  max-width: 56rem;
  margin: 0 auto;
  line-height: 1.5;

  @media (min-width: 640px) {
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const ContentGrid = styled.div`
  padding: 1.5rem;
  display: grid;
  gap: 1.5rem;

  @media (min-width: 768px) {
    padding: 2rem;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem;
    gap: 3rem;
  }
`;

const Column = styled.div``;

const BenefitsList = styled.ul`
  display: grid;
  gap: 1rem;

  @media (min-width: 768px) {
    gap: 1.5rem;
  }
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
`;

const BenefitIcon = styled.div`
  flex-shrink: 0;
  background-color: ${colors.blue100};
  padding: 0.5rem;
  border-radius: 50%;
  margin-right: 0.75rem;

  svg {
    width: 18px;
    height: 18px;

    @media (min-width: 640px) {
      width: 20px;
      height: 20px;
    }

    @media (min-width: 768px) {
      width: 24px;
      height: 24px;
    }
  }
`;

const BenefitContent = styled.div``;

const BenefitTitle = styled.h4`
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${colors.gray800};
  line-height: 1.3;

  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;

const BenefitDescription = styled.p`
  font-size: 0.8125rem;
  color: ${colors.gray600};
  margin-top: 0.25rem;
  line-height: 1.5;

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;

const ProcessCard = styled.div`
  background-color: ${colors.gray100};
  padding: 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid ${colors.gray200};

  @media (min-width: 768px) {
    padding: 1.5rem;
    border-radius: 0.75rem;
  }
`;

const ProcessList = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 768px) {
    gap: 1.5rem;
  }
`;

const ProcessItem = styled.div`
  display: flex;
`;

const ProcessStep = styled.div`
  flex-shrink: 0;
  color: ${colors.white};
  font-weight: 700;
  border-radius: 9999px;
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  background-color: ${colors.primary};
  font-size: 0.875rem;

  @media (min-width: 640px) {
    height: 2.25rem;
    width: 2.25rem;
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    height: 2.5rem;
    width: 2.5rem;
    margin-right: 1rem;
  }
`;

const CoverageGrid = styled.div`
  padding: 0 1.5rem 1.5rem;
  display: grid;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  @media (min-width: 768px) {
    padding: 0 2rem 2rem;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0 3rem 3rem;
  }
`;

const CoverageCard = styled.div`
  background-color: ${colors.blue100};
  padding: 1.25rem;
  border-radius: 0.5rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const CoverageList = styled.ul`
  display: grid;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const CoverageItem = styled.li`
  display: flex;
  align-items: flex-start;
  font-size: 0.8125rem;
  line-height: 1.5;

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }

  svg {
    width: 16px;
    height: 16px;
    margin-right: 0.5rem;
    margin-top: 0.125rem;
    flex-shrink: 0;

    @media (min-width: 640px) {
      width: 18px;
      height: 18px;
    }

    @media (min-width: 768px) {
      width: 20px;
      height: 20px;
    }
  }
`;

const CTASection = styled.div`
  padding: 2rem 1rem;
  text-align: center;
  color: ${colors.white};
  background-color: ${colors.primary};

  @media (min-width: 640px) {
    padding: 2.5rem 1.5rem;
  }

  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }

  @media (min-width: 1024px) {
    padding: 4rem 2rem;
  }
`;

const Button = styled.button`
  padding: 0.625rem 1.5rem;
  font-weight: 700;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  font-size: 0.8125rem;

  @media (min-width: 640px) {
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
  }
`;

const PrimaryButton = styled(Button)`
  cursor: pointer;
  border: none;
  background-color: ${colors.white};
  color: ${colors.primary};

  &:hover {
    background-color: ${colors.gray100};
  }
`;

const SecondaryButton = styled(Button)`
  cursor: pointer;
  background-color: transparent;
  border: 2px solid ${colors.white};
  color: ${colors.white};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1.5rem;

  @media (min-width: 640px) {
    flex-direction: row;
    gap: 1rem;
    margin-top: 2rem;
  }
`;

const RetailManagerPOSSupport = () => {
  return (
    <Container>
      <MainContent>
        <Header>
          <IconWrapper>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke={colors.primary}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
          </IconWrapper>
          <Title>RetailManager POS Support</Title>
          <Subtitle>
            Professional remote support for your point-of-sale system
          </Subtitle>
        </Header>

        <MainCard>
          <HeroSection>
            <SectionTitle>Comprehensive Remote Support</SectionTitle>
            <HeroText>
              We provide fast and efficient remote troubleshooting via
              TeamViewer, resolving software issues quickly without the need for
              on-site visits.
            </HeroText>
          </HeroSection>

          <ContentGrid>
            <Column>
              <SectionTitle
                style={{ color: colors.gray800, marginBottom: "1.25rem" }}
              >
                Key Benefits
              </SectionTitle>
              <BenefitsList>
                <BenefitItem>
                  <BenefitIcon>
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={colors.primary}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </BenefitIcon>
                  <BenefitContent>
                    <BenefitTitle>Instant Response</BenefitTitle>
                    <BenefitDescription>
                      Immediate attention to critical issues to minimize
                      downtime
                    </BenefitDescription>
                  </BenefitContent>
                </BenefitItem>
                <BenefitItem>
                  <BenefitIcon>
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={colors.primary}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </BenefitIcon>
                  <BenefitContent>
                    <BenefitTitle>Secure Connection</BenefitTitle>
                    <BenefitDescription>
                      End-to-end encrypted remote sessions for your security
                    </BenefitDescription>
                  </BenefitContent>
                </BenefitItem>
                <BenefitItem>
                  <BenefitIcon>
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={colors.primary}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </BenefitIcon>
                  <BenefitContent>
                    <BenefitTitle>24/7 Availability</BenefitTitle>
                    <BenefitDescription>
                      Support whenever you need it, even outside business hours
                    </BenefitDescription>
                  </BenefitContent>
                </BenefitItem>
                <BenefitItem>
                  <BenefitIcon>
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={colors.primary}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </BenefitIcon>
                  <BenefitContent>
                    <BenefitTitle>Proactive Maintenance</BenefitTitle>
                    <BenefitDescription>
                      Regular updates and checks to prevent issues before they
                      occur
                    </BenefitDescription>
                  </BenefitContent>
                </BenefitItem>
              </BenefitsList>
            </Column>

            <Column>
              <ProcessCard>
                <SectionTitle
                  style={{ color: colors.gray800, marginBottom: "1.25rem" }}
                >
                  How It Works
                </SectionTitle>
                <ProcessList>
                  <ProcessItem>
                    <ProcessStep>1</ProcessStep>
                    <BenefitContent>
                      <BenefitTitle>Request Support</BenefitTitle>
                      <BenefitDescription>
                        Contact us via phone, email, or our support portal with
                        your issue details
                      </BenefitDescription>
                    </BenefitContent>
                  </ProcessItem>
                  <ProcessItem>
                    <ProcessStep>2</ProcessStep>
                    <BenefitContent>
                      <BenefitTitle>Establish Connection</BenefitTitle>
                      <BenefitDescription>
                        We'll guide you through the simple TeamViewer connection
                        process
                      </BenefitDescription>
                    </BenefitContent>
                  </ProcessItem>
                  <ProcessItem>
                    <ProcessStep>3</ProcessStep>
                    <BenefitContent>
                      <BenefitTitle>Diagnose & Resolve</BenefitTitle>
                      <BenefitDescription>
                        Our certified technician will diagnose and fix your
                        issue remotely
                      </BenefitDescription>
                    </BenefitContent>
                  </ProcessItem>
                  <ProcessItem>
                    <ProcessStep>4</ProcessStep>
                    <BenefitContent>
                      <BenefitTitle>Confirm Resolution</BenefitTitle>
                      <BenefitDescription>
                        We'll verify everything is working properly before
                        ending the session
                      </BenefitDescription>
                    </BenefitContent>
                  </ProcessItem>
                </ProcessList>
              </ProcessCard>
            </Column>
          </ContentGrid>

          <div>
            <SectionTitle
              style={{
                color: colors.gray800,
                marginBottom: "1.25rem",
                padding: "0 1.5rem",
              }}
            >
              Support Coverage
            </SectionTitle>
            <CoverageGrid>
              <CoverageCard>
                <BenefitTitle
                  style={{ fontSize: "1rem", fontWeight: "700" }}
                >
                  Software Issues
                </BenefitTitle>
                <CoverageList>
                  <CoverageItem>
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={colors.primary}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>System errors and crashes</span>
                  </CoverageItem>
                  <CoverageItem>
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={colors.primary}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Performance optimization</span>
                  </CoverageItem>
                  <CoverageItem>
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={colors.primary}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Update and installation issues</span>
                  </CoverageItem>
                </CoverageList>
              </CoverageCard>
              <CoverageCard>
                <BenefitTitle
                  style={{ fontSize: "1rem", fontWeight: "700" }}
                >
                  Configuration
                </BenefitTitle>
                <CoverageList>
                  <CoverageItem>
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={colors.primary}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Printer and scanner setup</span>
                  </CoverageItem>
                  <CoverageItem>
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={colors.primary}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Hardware integration</span>
                  </CoverageItem>
                  <CoverageItem>
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={colors.primary}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Network configuration</span>
                  </CoverageItem>
                </CoverageList>
              </CoverageCard>
              <CoverageCard>
                <BenefitTitle
                  style={{ fontSize: "1rem", fontWeight: "700" }}
                >
                  Training
                </BenefitTitle>
                <CoverageList>
                  <CoverageItem>
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={colors.primary}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>New staff onboarding</span>
                  </CoverageItem>
                  <CoverageItem>
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={colors.primary}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Feature walkthroughs</span>
                  </CoverageItem>
                  <CoverageItem>
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={colors.primary}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Best practices guidance</span>
                  </CoverageItem>
                </CoverageList>
              </CoverageCard>
            </CoverageGrid>
          </div>

          <CTASection>
            <SectionTitle>Ready to Experience Seamless Support?</SectionTitle>
            <HeroText style={{ marginBottom: "1.5rem" }}>
              Our team is available 24/7 to ensure your POS system runs
              smoothly.
            </HeroText>
            <ButtonGroup>
              <PrimaryButton
                onClick={() => (window.location.href = "/Contact")}
              >
                Contact Support Team
              </PrimaryButton>
              <SecondaryButton
                as="a"
                href="https://www.aaapos.com/support/"
                target="_blank"
              >
                View Support Plans
              </SecondaryButton>
            </ButtonGroup>
          </CTASection>
        </MainCard>
      </MainContent>
    </Container>
  );
};

export default RetailManagerPOSSupport;
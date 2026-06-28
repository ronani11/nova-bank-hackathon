import {
  object,
  array,
  equals,
  oneOf,
  withDefault,
  parseString,
  optional,
  parseNumber,
  map,
  lazy,
  type Parser,
} from 'pure-parse'
import {
  type AssetContent,
  type RichTextContent,
  type BlockContent,
} from '../delivery-api'
import { parseRichTextContent } from './parseRichTextContent'
import { parseLinkContent } from './parseLinkContent'
import type {
  CardsContent,
  Content,
  HeroContent,
  PageContent,
  TestimonialContent,
  TestimonialsContent,
  UnknownContent,
  TabsContent,
  TabContent,
  CardContent,
  TeamMemberContent,
  TeamMembersContent,
  BackgroundColor,
  ButtonContent,
  StepItemContent,
  StepsContent,
  TrustBarContent,
  TrustBarItemContent,
  RateItemContent,
  RatesContent,
  LoanPurposeContent,
  LoanCalculatorContent,
} from '.'

// Recursive parsers require lazy loading
export const parseContent: Parser<Content> = lazy(() =>
  oneOf(
    parsePageContent,
    parseTestimonialsContent,
    parseTestimonialContent,
    parseCardsContent,
    parseCardContent,
    parseHeroContent,
    parseTabsContent,
    parseTabContent,
    parseTeamMembersContent,
    parseTeamMemberContent,
    parseButtonContent,
    parseStepsContent,
    parseStepItemContent,
    parseTrustBarContent,
    parseTrustBarItemContent,
    parseRatesContent,
    parseRateItemContent,
    parseLoanCalculatorContent,
  ),
)

const parseBackgroundColor = withDefault<BackgroundColor>(
  oneOf(
    equals('white'),
    equals('grey'),
    equals('beige'),
    equals('purple'),
    equals('orange'),
    equals('yellow'),
    equals('green'),
    equals('pink'),
    equals('blue'),
  ),
  'white',
)

const parseAssetContent = object<AssetContent>({
  fieldtype: equals('asset'),
  id: parseNumber,
  filename: parseString,
  title: optional(withDefault(parseString, undefined)),
  alt: optional(withDefault(parseString, undefined)),
  copyright: optional(withDefault(parseString, undefined)),
  focus: optional(withDefault(parseString, undefined)),
})

const parseBlockContent = object<BlockContent>({
  component: parseString,
  _uid: parseString,
  _editable: optional(parseString),
})

// Parse content
const parseUnknownContent = map(
  parseBlockContent,
  (block) =>
    ({
      ...block,
      component: 'unknown',
    }) as UnknownContent,
)

export const parseBlocks = array(
  oneOf(
    parseContent,
    // Fall back to "unknown" if any of the fields are invalid. This keeps the _uid
    parseUnknownContent,
  ),
)

export const parsePageContent = object<PageContent>({
  component: equals('page'),
  _uid: parseString,
  _editable: optional(parseString),
  body: withDefault(parseBlocks, []),
})

export const parseTestimonialContent = object<TestimonialContent>({
  component: equals('testimonial'),
  _uid: parseString,
  _editable: optional(parseString),
  quote: parseString,
  name: parseString,
  title: parseString,
  image: withDefault(parseAssetContent, undefined),
  imageBackgroundColor: parseBackgroundColor,
})

export const parseTestimonialsContent = object<TestimonialsContent>({
  component: equals('testimonials'),
  _uid: parseString,
  _editable: optional(parseString),
  title: parseString,
  description: parseString,
  testimonials: withDefault(parseBlocks, []),
})

export const parseCardContent = object<CardContent>({
  component: equals('card'),
  _uid: parseString,
  _editable: optional(parseString),
  description: parseRichTextContent,
  icon: withDefault(parseAssetContent, undefined),
})

export const parseCardsContent = object<CardsContent>({
  component: equals('cards'),
  _uid: parseString,
  _editable: optional(parseString),
  description: parseRichTextContent,
  cards: array(parseCardContent),
})

export const parseHeroContent = object<HeroContent>({
  component: equals('hero'),
  _uid: parseString,
  _editable: optional(parseString),
  image: withDefault(parseAssetContent, undefined),
  textAlignment: withDefault(
    oneOf(equals('left'), equals('right'), equals('center')),
    'left',
  ),
  imagePadding: withDefault(equals(true), false),
  description: withDefault(parseRichTextContent, {
    type: 'doc',
    content: [],
  } as RichTextContent),
  backgroundColor: parseBackgroundColor,
  buttons: withDefault(array(lazy(() => parseButtonContent)), []),
  background: withDefault(oneOf(equals('white'), equals('navy')), 'white'),
  show_stats: withDefault(equals(true), false),
})

export const parseTabContent = object<TabContent>({
  component: equals('tab'),
  _uid: parseString,
  _editable: optional(parseString),
  title: parseString,
  content: withDefault(parseBlocks, [] as Content[]),
})

export const parseTabsContent = object<TabsContent>({
  component: equals('tabs'),
  _uid: parseString,
  _editable: optional(parseString),
  tabs: array(parseTabContent),
  description: withDefault(parseRichTextContent, {
    type: 'doc',
    content: [],
  } as RichTextContent),
})

export const parseTeamMemberContent = object<TeamMemberContent>({
  component: equals('teamMember'),
  _uid: parseString,
  _editable: optional(parseString),
  name: parseString,
  title: parseString,
  image: withDefault(parseAssetContent, undefined),
  backgroundColor: parseBackgroundColor,
})

export const parseTeamMembersContent = object<TeamMembersContent>({
  component: equals('teamMembers'),
  _uid: parseString,
  _editable: optional(parseString),
  description: parseRichTextContent,
  teamMembers: withDefault(
    array(
      object({
        uuid: parseString,
        content: parseTeamMemberContent,
      }),
    ),
    [],
  ),
})

export const parseButtonContent = object<ButtonContent>({
  component: equals('button'),
  _uid: parseString,
  _editable: optional(parseString),
  text: parseString,
  link: withDefault(parseLinkContent, undefined),
  color: withDefault(oneOf(equals('primary'), equals('secondary')), 'primary'),
})

export const parseStepItemContent = object<StepItemContent>({
  component: equals('step_item'),
  _uid: parseString,
  _editable: optional(parseString),
  title: parseString,
  description: parseString,
})

export const parseTrustBarItemContent = object<TrustBarItemContent>({
  component: equals('trust_item'),
  _uid: parseString,
  _editable: optional(parseString),
  icon: parseString,
  label: parseString,
})

export const parseTrustBarContent = object<TrustBarContent>({
  component: equals('trust_bar'),
  _uid: parseString,
  _editable: optional(parseString),
  items: withDefault(array(lazy(() => parseTrustBarItemContent)), []),
})

export const parseStepsContent = object<StepsContent>({
  component: equals('steps'),
  _uid: parseString,
  _editable: optional(parseString),
  title: parseString,
  subtitle: optional(withDefault(parseString, undefined)),
  items: withDefault(array(parseStepItemContent), []),
})

export const parseRateItemContent = object<RateItemContent>({
  component: equals('rate_item'),
  _uid: parseString,
  _editable: optional(parseString),
  purpose: parseString,
  rate: parseString,
  featured: withDefault(equals(true), false),
})

export const parseRatesContent = object<RatesContent>({
  component: equals('rates'),
  _uid: parseString,
  _editable: optional(parseString),
  title: parseString,
  subtitle: optional(withDefault(parseString, undefined)),
  footnote: optional(withDefault(parseString, undefined)),
  items: withDefault(array(parseRateItemContent), []),
})

export const parseLoanPurposeContent = object<LoanPurposeContent>({
  component: equals('loan_purpose'),
  _uid: parseString,
  _editable: optional(parseString),
  label: parseString,
  interest_rate: parseNumber,
})

export const parseLoanCalculatorContent = object<LoanCalculatorContent>({
  component: equals('loan_calculator'),
  _uid: parseString,
  _editable: optional(parseString),
  title: optional(withDefault(parseString, undefined)),
  min_amount: optional(withDefault(parseNumber, undefined)),
  max_amount: optional(withDefault(parseNumber, undefined)),
  step_amount: optional(withDefault(parseNumber, undefined)),
  default_amount: optional(withDefault(parseNumber, undefined)),
  min_term: optional(withDefault(parseNumber, undefined)),
  max_term: optional(withDefault(parseNumber, undefined)),
  step_term: optional(withDefault(parseNumber, undefined)),
  default_term: optional(withDefault(parseNumber, undefined)),
  loan_purposes: optional(withDefault(array(parseLoanPurposeContent), undefined)),
  cta_text: optional(withDefault(parseString, undefined)),
  cta_url: optional(withDefault(parseLinkContent, undefined)),
  show_disclaimer: optional(withDefault(equals(true), undefined)),
})

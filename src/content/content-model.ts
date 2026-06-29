import type {
  AssetContent,
  BlockContent,
  LinkContent,
  RichTextContent,
  Story,
} from '../delivery-api'

export type Content =
  | UnknownContent
  | PageContent
  | TestimonialContent
  | TestimonialsContent
  | CardsContent
  | CardContent
  | HeroContent
  | TabsContent
  | TabContent
  | TeamMembersContent
  | TeamMemberContent
  | ButtonContent
  | StepsContent
  | StepItemContent
  | TrustBarContent
  | TrustBarItemContent
  | RatesContent
  | RateItemContent
  | DisclaimerContent
  | LoanCalculatorContent

/**
 * When the parsing of a component fails, fall back fack to this component.
 * Parsing could fail for several reasons; for example,
 * 1. You changed the schema of a component without updating the content.
 * 2. You have modeled the content incorrectly in your type alias and parser
 */
export type UnknownContent = BlockContent<{
  component: 'unknown'
}>

export type PageContent = BlockContent<{
  component: 'page'
  body: Content[]
}>

export type BackgroundColor =
  | 'beige'
  | 'white'
  | 'grey'
  | 'purple'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'pink'
  | 'blue'

export type TestimonialContent = BlockContent<{
  component: 'testimonial'
  quote: string
  image?: AssetContent
  name: string
  title: string
  imageBackgroundColor: BackgroundColor
}>

export type TestimonialsContent = BlockContent<{
  component: 'testimonials'
  title: string
  description: string
  testimonials: Content[]
}>

export type CardsContent = BlockContent<{
  component: 'cards'
  description: RichTextContent
  cards: CardContent[]
}>

export type CardContent = BlockContent<{
  component: 'card'
  description: RichTextContent
  icon?: AssetContent
}>

export type HeroContent = BlockContent<{
  component: 'hero'
  image?: AssetContent
  imagePadding: boolean
  textAlignment: 'left' | 'right' | 'center'
  description: RichTextContent
  backgroundColor: BackgroundColor
  buttons: ButtonContent[]
  background?: 'white' | 'navy'
  show_stats?: boolean
}>

export type TabsContent = BlockContent<{
  component: 'tabs'
  description: RichTextContent
  tabs: TabContent[]
}>

export type TabContent = BlockContent<{
  component: 'tab'
  title: string
  content: Content[]
}>

export type TeamMemberContent = BlockContent<{
  component: 'teamMember'
  name: string
  title: string
  image?: AssetContent
  backgroundColor: BackgroundColor
}>

export type TeamMembersContent = BlockContent<{
  component: 'teamMembers'
  description: RichTextContent
  teamMembers: (Story & {
    content: TeamMemberContent
  })[]
}>

export type ButtonContent = BlockContent<{
  component: 'button'
  text: string
  link?: LinkContent
  color: 'primary' | 'secondary'
}>

export type StepItemContent = BlockContent<{
  component: 'step_item'
  title: string
  description: string
}>

export type TrustBarItemContent = BlockContent<{
  component: 'trust_item'
  icon: string
  label: string
}>

export type TrustBarContent = BlockContent<{
  component: 'trust_bar'
  items: TrustBarItemContent[]
}>

export type StepsContent = BlockContent<{
  component: 'steps'
  title: string
  subtitle?: string
  items: StepItemContent[]
}>

export type RateItemContent = BlockContent<{
  component: 'rate_item'
  purpose: string
  rate: string
  featured?: boolean
}>

export type RatesContent = BlockContent<{
  component: 'rates'
  title: string
  subtitle?: string
  footnote?: string
  items: RateItemContent[]
}>

export type DisclaimerContent = BlockContent<{
  component: 'disclaimer'
  disclaimer_text?: string
  afm_image?: AssetContent
}>

export type LoanPurposeContent = BlockContent<{
  component: 'loan_purpose'
  label: string
  interest_rate: number
}>

export type LoanCalculatorContent = BlockContent<{
  component: 'loan_calculator'
  title?: string
  min_amount?: number
  max_amount?: number
  step_amount?: number
  default_amount?: number
  min_term?: number
  max_term?: number
  step_term?: number
  default_term?: number
  loan_purposes?: LoanPurposeContent[]
  cta_text?: string
  cta_url?: LinkContent
  show_disclaimer?: boolean
}>

# B0 input — Figma `get_design_context` result, frame v2

Re-pull of node `4:4` (`rare-metal-catalog`, file `CodeAssembly` `AVLIqjQ21DfsfmVfBJB1tk`) after
Frank updated the frame (B0-2). Called 2026-09-22 with `clientFrameworks: spynejs`,
`clientLanguages: javascript,html,css`, `skillNames: figma-design-to-code`, screenshot excluded
from the response (saved separately via `get_screenshot` as `B0-figma-catalog-v2.png`, 1440 × 1626).

Transcription note as for `A1-figma-catalog.md`: written from the tool response text; the six
structurally identical product cards were emitted from one card block with each card's values
substituted. The tool's three notes were identical to A1's and are not repeated.

**What changed against A1's pull:** section background `#08080a` → `#091725`; every text layer's
typeface → `Inter` (Semi Bold eyebrow / price / button, Regular title / body / meta / footnote,
Medium filter values, **Bold** product names). Colours of text, cards, borders, accent and the
image containers are unchanged. Asset URLs are new (remote, expire after 7 days).

```jsx
const imgProductImage = "https://www.figma.com/api/mcp/asset/ec663176-847f-4649-b3d6-de27447b6e4f.png";
const imgProductImage1 = "https://www.figma.com/api/mcp/asset/934cd0ea-f4c2-418d-9159-046d50a1fc9c.png";
const imgProductImage2 = "https://www.figma.com/api/mcp/asset/df263635-3643-4fbe-b198-995745b9f71e.png";
const imgProductImage3 = "https://www.figma.com/api/mcp/asset/29db4eef-95cc-4119-a082-8846c44f060e.png";
const imgProductImage4 = "https://www.figma.com/api/mcp/asset/458db09a-1ca6-4f8c-8c22-3d8a17f6acc0.png";
const imgProductImage5 = "https://www.figma.com/api/mcp/asset/54101bf2-bfd9-4dea-8d92-76af17304e62.png";
const imgLine = "https://www.figma.com/api/mcp/asset/905fafa2-4a51-4551-8266-14141d20db0a.svg";
const imgChevronDown = "https://www.figma.com/api/mcp/asset/3cab44ea-8007-4305-adbb-24eb3edf40d8.svg";
const imgLine1 = "https://www.figma.com/api/mcp/asset/40b96ece-e855-4611-b2ec-7226af5803f1.svg";
const imgPlus = "https://www.figma.com/api/mcp/asset/77bb6d14-b290-4013-9d5b-dc9842471112.svg";
const imgLine2 = "https://www.figma.com/api/mcp/asset/4c68ecd4-a895-4e35-993a-da2bc9b44611.svg";

export default function RareMetalCatalog() {
  return (
    <div className="bg-[#091725] content-stretch flex flex-col gap-[48px] items-start px-[80px] py-[100px] relative size-full" data-node-id="4:4" data-name="rare-metal-catalog">
      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="4:5" data-name="header-block">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[normal] not-italic relative shrink-0 w-full" data-node-id="4:6" data-name="Frame">
          <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#d4c3a3] text-[12px] uppercase w-full" data-node-id="4:7">{`METEORIC & ASTEROIDAL SAMPLES`}</p>
          <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#f3f4f6] text-[48px] w-full" data-node-id="4:8">{`Rare Earth & Heavy Metals`}</p>
          <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8e8e93] text-[16px] w-full" data-node-id="4:9">
            Archival-grade heavy metal specimens certified of off-world origin. Available in limited single-batch allocations.
          </p>
        </div>
        <div className="h-0 relative shrink-0 w-full" data-node-id="4:10" data-name="Line">
          <div className="absolute inset-[-1px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={imgLine} />
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4:11" data-name="filter-row">
        <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-node-id="4:12" data-name="filter-dropdowns">
          <div className="border border-[#222228] border-solid content-stretch flex gap-[12px] h-[40px] items-center px-[16px] py-[10px] relative rounded-[4px] shrink-0" data-node-id="4:13" data-name="filter-dropdown">
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8e8e93] text-[13px] whitespace-nowrap" data-node-id="4:14">
              Metal type:
            </p>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#f3f4f6] text-[13px] whitespace-nowrap" data-node-id="4:15">
              All Specimens
            </p>
            <div className="relative shrink-0 size-[12px]" data-node-id="4:139" data-name="chevron-down">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronDown} />
            </div>
          </div>
          <div className="border border-[#222228] border-solid content-stretch flex gap-[12px] h-[40px] items-center px-[16px] py-[10px] relative rounded-[4px] shrink-0" data-node-id="4:17" data-name="filter-dropdown">
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8e8e93] text-[13px] whitespace-nowrap" data-node-id="4:18">
              Origin asteroid:
            </p>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#f3f4f6] text-[13px] whitespace-nowrap" data-node-id="4:19">
              All Fields
            </p>
            <div className="relative shrink-0 size-[12px]" data-node-id="4:142" data-name="chevron-down">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronDown} />
            </div>
          </div>
        </div>
        <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-center leading-[normal] not-italic relative shrink-0 text-[12px] whitespace-nowrap" data-node-id="4:21" data-name="Frame">
          <p className="relative shrink-0 text-[#8e8e93]" data-node-id="4:22">
            SHOWING:
          </p>
          <p className="relative shrink-0 text-[#f3f4f6]" data-node-id="4:23">
            6 ARCHIVED LOTS
          </p>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="4:24" data-name="catalog-grid">
        <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-node-id="4:25" data-name="grid-row-1">
          <div className="bg-[#111115] border border-[#222228] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px p-[16px] relative rounded-[8px] self-stretch" data-node-id="4:26" data-name="product-card">
            <div className="aspect-square bg-[#08080a] content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-node-id="4:27" data-name="image-container">
              <div className="flex-[1_0_0] min-h-px relative w-full" data-node-id="4:28" data-name="product-image">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <img alt="" className="absolute max-w-none object-cover size-full" src={imgProductImage} />
                  <div className="absolute bg-[rgba(0,0,0,0.25)] inset-0" />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="4:29" data-name="product-meta">
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="4:30" data-name="Frame">
                <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#f3f4f6] text-[20px] w-full" data-node-id="4:31">
                  Iridium Crystal Node
                </p>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="4:32" data-name="Frame">
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8e8e93] text-[11px] whitespace-nowrap" data-node-id="4:33">
                    101955 BENNU
                  </p>
                  <div className="bg-[#33333c] relative rounded-[1.5px] shrink-0 size-[3px]" data-node-id="4:34" data-name="Rectangle" />
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#d4c3a3] text-[11px] whitespace-nowrap" data-node-id="4:35">
                    12.44g
                  </p>
                </div>
              </div>
              <div className="h-0 relative shrink-0 w-full" data-node-id="4:36" data-name="Line">
                <div className="absolute inset-[-1px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine1} />
                </div>
              </div>
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4:37" data-name="Frame">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic relative shrink-0 whitespace-nowrap" data-node-id="4:38" data-name="Frame">
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8e8e93] text-[10px] uppercase" data-node-id="4:39">
                    VALUATION
                  </p>
                  <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#f3f4f6] text-[16px]" data-node-id="4:40">
                    $4,250
                  </p>
                </div>
                <div className="bg-[#d4c3a3] content-stretch flex gap-[6px] items-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-node-id="4:41" data-name="add-to-cart-btn">
                  <div className="relative shrink-0 size-[14px]" data-node-id="4:145" data-name="plus">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlus} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#08080a] text-[12px] whitespace-nowrap" data-node-id="4:43">
                    Acquire
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#111115] border border-[#222228] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px p-[16px] relative rounded-[8px] self-stretch" data-node-id="4:44" data-name="product-card">
            <div className="aspect-square bg-[#08080a] content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-node-id="4:45" data-name="image-container">
              <div className="flex-[1_0_0] min-h-px relative w-full" data-node-id="4:46" data-name="product-image">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <img alt="" className="absolute max-w-none object-cover size-full" src={imgProductImage1} />
                  <div className="absolute bg-[rgba(0,0,0,0.25)] inset-0" />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="4:47" data-name="product-meta">
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="4:48" data-name="Frame">
                <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#f3f4f6] text-[20px] w-full" data-node-id="4:49">
                  Osmium Spherule
                </p>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="4:50" data-name="Frame">
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8e8e93] text-[11px] whitespace-nowrap" data-node-id="4:51">
                    16 PSYCHE
                  </p>
                  <div className="bg-[#33333c] relative rounded-[1.5px] shrink-0 size-[3px]" data-node-id="4:52" data-name="Rectangle" />
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#d4c3a3] text-[11px] whitespace-nowrap" data-node-id="4:53">
                    84.10g
                  </p>
                </div>
              </div>
              <div className="h-0 relative shrink-0 w-full" data-node-id="4:54" data-name="Line">
                <div className="absolute inset-[-1px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine2} />
                </div>
              </div>
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4:55" data-name="Frame">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic relative shrink-0 whitespace-nowrap" data-node-id="4:56" data-name="Frame">
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8e8e93] text-[10px] uppercase" data-node-id="4:57">
                    VALUATION
                  </p>
                  <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#f3f4f6] text-[16px]" data-node-id="4:58">
                    $9,800
                  </p>
                </div>
                <div className="bg-[#d4c3a3] content-stretch flex gap-[6px] items-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-node-id="4:59" data-name="add-to-cart-btn">
                  <div className="relative shrink-0 size-[14px]" data-node-id="4:148" data-name="plus">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlus} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#08080a] text-[12px] whitespace-nowrap" data-node-id="4:61">
                    Acquire
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#111115] border border-[#222228] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px p-[16px] relative rounded-[8px] self-stretch" data-node-id="4:62" data-name="product-card">
            <div className="aspect-square bg-[#08080a] content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-node-id="4:63" data-name="image-container">
              <div className="flex-[1_0_0] min-h-px relative w-full" data-node-id="4:64" data-name="product-image">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <img alt="" className="absolute max-w-none object-cover size-full" src={imgProductImage2} />
                  <div className="absolute bg-[rgba(0,0,0,0.25)] inset-0" />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="4:65" data-name="product-meta">
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="4:66" data-name="Frame">
                <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#f3f4f6] text-[20px] w-full" data-node-id="4:67">
                  Rhodium Filament
                </p>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="4:68" data-name="Frame">
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8e8e93] text-[11px] whitespace-nowrap" data-node-id="4:69">
                    511 DAVIDA
                  </p>
                  <div className="bg-[#33333c] relative rounded-[1.5px] shrink-0 size-[3px]" data-node-id="4:70" data-name="Rectangle" />
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#d4c3a3] text-[11px] whitespace-nowrap" data-node-id="4:71">
                    5.21g
                  </p>
                </div>
              </div>
              <div className="h-0 relative shrink-0 w-full" data-node-id="4:72" data-name="Line">
                <div className="absolute inset-[-1px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine2} />
                </div>
              </div>
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4:73" data-name="Frame">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic relative shrink-0 whitespace-nowrap" data-node-id="4:74" data-name="Frame">
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8e8e93] text-[10px] uppercase" data-node-id="4:75">
                    VALUATION
                  </p>
                  <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#f3f4f6] text-[16px]" data-node-id="4:76">
                    $12,150
                  </p>
                </div>
                <div className="bg-[#d4c3a3] content-stretch flex gap-[6px] items-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-node-id="4:77" data-name="add-to-cart-btn">
                  <div className="relative shrink-0 size-[14px]" data-node-id="4:151" data-name="plus">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlus} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#08080a] text-[12px] whitespace-nowrap" data-node-id="4:79">
                    Acquire
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-node-id="4:80" data-name="grid-row-2">
          <div className="bg-[#111115] border border-[#222228] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px p-[16px] relative rounded-[8px] self-stretch" data-node-id="4:81" data-name="product-card">
            <div className="aspect-square bg-[#08080a] content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-node-id="4:82" data-name="image-container">
              <div className="flex-[1_0_0] min-h-px relative w-full" data-node-id="4:83" data-name="product-image">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <img alt="" className="absolute max-w-none object-cover size-full" src={imgProductImage3} />
                  <div className="absolute bg-[rgba(0,0,0,0.25)] inset-0" />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="4:84" data-name="product-meta">
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="4:85" data-name="Frame">
                <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#f3f4f6] text-[20px] w-full" data-node-id="4:86">
                  Platinum Drusy Plate
                </p>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="4:87" data-name="Frame">
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8e8e93] text-[11px] whitespace-nowrap" data-node-id="4:88">
                    25143 ITOKAWA
                  </p>
                  <div className="bg-[#33333c] relative rounded-[1.5px] shrink-0 size-[3px]" data-node-id="4:89" data-name="Rectangle" />
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#d4c3a3] text-[11px] whitespace-nowrap" data-node-id="4:90">
                    110.50g
                  </p>
                </div>
              </div>
              <div className="h-0 relative shrink-0 w-full" data-node-id="4:91" data-name="Line">
                <div className="absolute inset-[-1px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine1} />
                </div>
              </div>
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4:92" data-name="Frame">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic relative shrink-0 whitespace-nowrap" data-node-id="4:93" data-name="Frame">
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8e8e93] text-[10px] uppercase" data-node-id="4:94">
                    VALUATION
                  </p>
                  <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#f3f4f6] text-[16px]" data-node-id="4:95">
                    $6,400
                  </p>
                </div>
                <div className="bg-[#d4c3a3] content-stretch flex gap-[6px] items-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-node-id="4:96" data-name="add-to-cart-btn">
                  <div className="relative shrink-0 size-[14px]" data-node-id="4:154" data-name="plus">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlus} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#08080a] text-[12px] whitespace-nowrap" data-node-id="4:98">
                    Acquire
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#111115] border border-[#222228] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px p-[16px] relative rounded-[8px] self-stretch" data-node-id="4:99" data-name="product-card">
            <div className="aspect-square bg-[#08080a] content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-node-id="4:100" data-name="image-container">
              <div className="flex-[1_0_0] min-h-px relative w-full" data-node-id="4:101" data-name="product-image">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <img alt="" className="absolute max-w-none object-cover size-full" src={imgProductImage4} />
                  <div className="absolute bg-[rgba(0,0,0,0.25)] inset-0" />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="4:102" data-name="product-meta">
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="4:103" data-name="Frame">
                <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#f3f4f6] text-[20px] w-full" data-node-id="4:104">
                  Palladium Dendrite
                </p>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="4:105" data-name="Frame">
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8e8e93] text-[11px] whitespace-nowrap" data-node-id="4:106">
                    433 EROS
                  </p>
                  <div className="bg-[#33333c] relative rounded-[1.5px] shrink-0 size-[3px]" data-node-id="4:107" data-name="Rectangle" />
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#d4c3a3] text-[11px] whitespace-nowrap" data-node-id="4:108">
                    36.25g
                  </p>
                </div>
              </div>
              <div className="h-0 relative shrink-0 w-full" data-node-id="4:109" data-name="Line">
                <div className="absolute inset-[-1px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine2} />
                </div>
              </div>
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4:110" data-name="Frame">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic relative shrink-0 whitespace-nowrap" data-node-id="4:111" data-name="Frame">
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8e8e93] text-[10px] uppercase" data-node-id="4:112">
                    VALUATION
                  </p>
                  <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#f3f4f6] text-[16px]" data-node-id="4:113">
                    $3,100
                  </p>
                </div>
                <div className="bg-[#d4c3a3] content-stretch flex gap-[6px] items-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-node-id="4:114" data-name="add-to-cart-btn">
                  <div className="relative shrink-0 size-[14px]" data-node-id="4:157" data-name="plus">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlus} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#08080a] text-[12px] whitespace-nowrap" data-node-id="4:116">
                    Acquire
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#111115] border border-[#222228] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px p-[16px] relative rounded-[8px] self-stretch" data-node-id="4:117" data-name="product-card">
            <div className="aspect-square bg-[#08080a] content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-node-id="4:118" data-name="image-container">
              <div className="flex-[1_0_0] min-h-px relative w-full" data-node-id="4:119" data-name="product-image">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <img alt="" className="absolute max-w-none object-cover size-full" src={imgProductImage5} />
                  <div className="absolute bg-[rgba(0,0,0,0.25)] inset-0" />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="4:120" data-name="product-meta">
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="4:121" data-name="Frame">
                <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#f3f4f6] text-[20px] w-full" data-node-id="4:122">
                  Ruthenium Aggregated Matrix
                </p>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="4:123" data-name="Frame">
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8e8e93] text-[11px] whitespace-nowrap" data-node-id="4:124">
                    2 PALLAS
                  </p>
                  <div className="bg-[#33333c] relative rounded-[1.5px] shrink-0 size-[3px]" data-node-id="4:125" data-name="Rectangle" />
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#d4c3a3] text-[11px] whitespace-nowrap" data-node-id="4:126">
                    55.02g
                  </p>
                </div>
              </div>
              <div className="h-0 relative shrink-0 w-full" data-node-id="4:127" data-name="Line">
                <div className="absolute inset-[-1px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine2} />
                </div>
              </div>
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4:128" data-name="Frame">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic relative shrink-0 whitespace-nowrap" data-node-id="4:129" data-name="Frame">
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8e8e93] text-[10px] uppercase" data-node-id="4:130">
                    VALUATION
                  </p>
                  <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#f3f4f6] text-[16px]" data-node-id="4:131">
                    $5,750
                  </p>
                </div>
                <div className="bg-[#d4c3a3] content-stretch flex gap-[6px] items-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-node-id="4:132" data-name="add-to-cart-btn">
                  <div className="relative shrink-0 size-[14px]" data-node-id="4:160" data-name="plus">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlus} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#08080a] text-[12px] whitespace-nowrap" data-node-id="4:134">
                    Acquire
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between leading-[normal] not-italic pt-[24px] relative shrink-0 text-[11px] w-full whitespace-nowrap" data-node-id="4:135" data-name="editorial-footnote">
        <p className="relative shrink-0 text-[#8e8e93]" data-node-id="4:136">
          SECURE DISPATCH AND ASTEROIDAL PROVENANCE DOCUMENTATION ACCOMPANY EACH ORDER.
        </p>
        <p className="[text-underline-position:from-font] decoration-from-font decoration-solid relative shrink-0 text-[#d4c3a3] underline" data-node-id="4:137">
          SPECIMEN AUTHENTICITY REPORT [PDF]
        </p>
      </div>
    </div>
  );
}
```

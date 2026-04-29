# PETCARE SMART — Shopify Theme

Thème Shopify premium pour PETCARE SMART, litière robot intelligente pour chats.
Optimisé pour la conversion avec 13 sections homepage, page produit complète, design responsive et accessible WCAG 2.1 AA.

## Stack

- Shopify Liquid (OS 2.0 compatible)
- CSS Custom Properties (tokens de design)
- JavaScript Vanilla (Web Components)
- Google Fonts : Montserrat, Inter, Lora

## Palette

| Token | Valeur | Usage |
|---|---|---|
| `--brown` | `#3D2817` | Headers, premium |
| `--cream` | `#F5F1ED` | Backgrounds, respiration |
| `--green` | `#8B9B6F` | CTAs, accents |
| `--charcoal` | `#0D0D0D` | Fonds sombres, texte fort |

## Structure

```
liti-re/
├── config/
│   └── settings_schema.json      # Paramètres du thème
├── layout/
│   └── theme.liquid              # Layout principal
├── sections/                     # 13 sections
│   ├── header.liquid
│   ├── hero.liquid
│   ├── problem-statement.liquid
│   ├── solution.liquid
│   ├── benefits.liquid
│   ├── features-grid.liquid
│   ├── before-after.liquid
│   ├── social-proof.liquid
│   ├── testimonials.liquid
│   ├── faq.liquid
│   ├── pricing.liquid
│   ├── final-cta.liquid
│   └── footer.liquid
├── snippets/
│   ├── product-card.liquid
│   └── breadcrumb.liquid
├── assets/
│   ├── styles.css                # CSS complet (~700 lignes)
│   ├── script.js                 # JavaScript principal
│   └── theme.js                  # Web Components
└── templates/
    ├── index.liquid              # Homepage (13 sections)
    ├── product.liquid            # Page produit
    ├── collection.liquid         # Collection
    ├── cart.liquid               # Panier
    ├── page.liquid               # Pages génériques
    └── 404.liquid                # Erreur 404
```

## Images à uploader dans Shopify (Assets)

| Fichier | Section | Description |
|---|---|---|
| `hero-liberty.jpg` | Hero | Chat bengal entrant dans la litière |
| `product-hero.jpg` | Solution + Produit | Shot studio fond blanc |
| `app-feature.jpg` | Features | Téléphone + app + chat |
| `before-after.jpg` | Before/After | Comparaison avant/après |
| `multi-cat.jpg` | Features | Scène multi-chats salon |
| `noise-feature.jpg` | Features | Graphique bruit + enfant dormant |
| `mechanism.jpg` | Features | Vue éclatée mécanisme |
| `tech-specs.jpg` | Features/Produit | Spécifications techniques |
| `operation-details.jpg` | Features | Opération physique |
| `app-interface.jpg` | Features | Interface app mobile |
| `space-optimization.jpg` | Features | Capacité 65L |

## Installation dans Shopify

### Option 1 — Via Shopify CLI

```bash
# Installer Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Cloner le repo
git clone https://github.com/krmconcept/liti-re.git
cd liti-re

# Uploader le thème (non publié)
shopify theme push --store votre-boutique.myshopify.com --unpublished

# Développement local
shopify theme dev --store votre-boutique.myshopify.com
```

### Option 2 — Via Admin Shopify

1. Aller dans **Boutique en ligne > Thèmes**
2. Cliquer **Ajouter un thème > Télécharger un fichier ZIP**
3. Zipper le dossier `liti-re/` et l'uploader

### Étapes post-installation

1. **Uploader les 11 images** dans `Contenu > Fichiers`
2. **Configurer le produit** PETCARE SMART avec titre, prix (349,90€), images
3. **Personnaliser via le thème** : Boutique en ligne > Personnaliser
4. **Configurer les réseaux sociaux** dans Paramètres du thème
5. **Publier** quand tout est prêt

## Produit

- **Nom** : PETCARE SMART - Litière Robot Intelligente
- **Prix** : 349,90€ TTC
- **SKU** : PCS-001
- **Marché** : Belgique + France

## Support

- **Email** : contact@petcaresmart.be
- **Repo** : https://github.com/krmconcept/liti-re

## Licence

MIT © 2025 KRM Concept

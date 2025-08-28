#!/bin/bash

# Deployment script for Kyron HR Portal
echo "🚀 Building Kyron HR Portal for deployment..."

# Build the project
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Built files are in the 'dist' directory"
    echo ""
    echo "🌐 To deploy to Vercel:"
    echo "   1. Install Vercel CLI: npm i -g vercel"
    echo "   2. Run: vercel"
    echo "   3. Follow the prompts"
    echo ""
    echo "📦 Or upload the 'dist' folder to any static hosting service"
    echo ""
    echo "🔗 Local preview: npm run preview"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi

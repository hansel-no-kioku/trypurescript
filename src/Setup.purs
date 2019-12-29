module Setup
  ( main
  ) where

import Prelude

import Data.Maybe (fromMaybe)
import Effect (Effect)
import Node.Encoding (Encoding(..))
import Node.FS.Sync (writeTextFile)
import Node.Path (FilePath, concat)
import Node.Process (lookupEnv)

defaultServer ∷ String
defaultServer = "http://localhost:3000"

srcPath ∷ FilePath
srcPath = concat ["src", "Try", "Host.js"]

srcContent ∷ String → String
srcContent server = "exports.host = \"" <> server <> "\";\n"

main ∷ Effect Unit
main = do
  server <- fromMaybe defaultServer <$> lookupEnv "TRY_PURESCRIPT_SERVER"
  writeTextFile UTF8 srcPath $ srcContent server


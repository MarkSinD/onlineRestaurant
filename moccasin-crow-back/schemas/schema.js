import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import breakfast from "./breakfast";
import burger from "./burger";
import dinner from "./dinner";
import drinks from "./drinks";
import icecream from "./icecream";
import lunch from "./lunch";
import pizza from "./pizza";
import sandwich from "./sandwich";
import shawarma from "./shawarma";
import suggestionFood from "./suggestionFood";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([breakfast, burger, dinner, drinks, icecream, lunch, pizza, sandwich, shawarma, suggestionFood]),
});

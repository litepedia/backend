import os
import openai
openai.api_key = ''
completion = openai.ChatCompletion.create(
  model="gpt-3.5-turbo", 
  messages = [

{"role": "user", "content" : "explain to a first grader this paragraph in no longer than four sentences \n Supported by: The Wars of the Roses (1455–1487), known at the time and for more than a century after as the Civil Wars, were a series of civil wars fought over control of the English throne in the mid-to-late fifteenth century. These wars were fought between supporters of two rival cadet branches of the royal House of Plantagenet: Lancaster and York. The wars extinguished the male lines of the two branches, leading to the Tudor family inheriting the Lancastrian claim to the throne. Following the war, the Houses of Lancaster and York were united, creating a new royal dynasty and thereby resolving their rival claims. For over thirty years, there were greater and lesser levels of violent conflict between various rival contenders for control of the English monarchy. The War of the Roses had its roots in the wake of the Hundred Years' War. After fighting a series of armed conflicts with France, the English monarchy's prestige was weakened by emergent socio-economic troubles.[i] This weakened prestige unfolded structural problems with bastard feudalism, a system developed by the powerful duchies created by Edward III.[8] Combined with the mental infirmity and weak rule of King Henry VI, these structural problems revived interest in the Yorkist claim to the throne by Richard of York. Historians disagree over which of these factors was the main catalyst for the wars.[9] It was also used as a proxy war between France and the Burgundian State. The wars began in 1455 when Richard of York captured Henry at the First Battle of St Albans and was appointed Lord Protector by Parliament, leading to an uneasy peace.[10] Fighting resumed four years later. Yorkists, led by Richard Neville, 16th Earl of Warwick, often referred to as \"Warwick the Kingmaker,\" captured Henry again at the Battle of Northampton. Richard of York attempted to claim the throne but was dissuaded and was then killed at the Battle of Wakefield. His son Edward inherited his claim. The Yorkists lost custody of Henry after the Second Battle of St Albans but destroyed the Lancastrian army at the Battle of Towton. Edward was formally crowned three months later in June 1461.[11][12] Resistance to Edward's rule continued but was crushed at the Battle of Hexham in 1464, and a period of relative peace ensued."}]
)
#print(completion)
print(completion)